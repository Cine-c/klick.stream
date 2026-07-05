import { verifyWebhookSignature } from '../../../lib/lemonsqueezy';
import { setUserDoc } from '../../../lib/firestore-admin';

// Raw body required for signature verification.
export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-signature'];

  let valid;
  try {
    valid = await verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error('LS webhook verify error:', err.message);
    return res.status(500).json({ error: 'Webhook not configured' });
  }
  if (!valid) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try {
    const eventName = event?.meta?.event_name || '';
    // Only act on subscription-lifecycle events whose payload IS a subscription.
    // Payment events (subscription_payment_success/_failed) carry an invoice
    // object (data.type "subscription-invoices"), not a subscription status —
    // processing those would corrupt subscriptionStatus.
    const isSubscriptionObject = event?.data?.type === 'subscriptions';
    if (!eventName.startsWith('subscription_') || !isSubscriptionObject) {
      return res.status(200).json({ received: true, ignored: eventName });
    }

    const uid = event?.meta?.custom_data?.user_id;
    if (!uid) {
      console.warn('LS webhook missing custom_data.user_id for', eventName);
      return res.status(200).json({ received: true, note: 'no uid' });
    }

    const attr = event?.data?.attributes || {};
    const subscriptionId = event?.data?.id ? String(event.data.id) : null;
    const status = attr.status || 'unknown'; // active | on_trial | paused | past_due | unpaid | cancelled | expired

    // Access continues until this date (renews_at while active, ends_at once cancelled).
    const endIso = attr.renews_at || attr.ends_at || null;
    const currentPeriodEnd = endIso ? Math.floor(new Date(endIso).getTime() / 1000) : 0;
    const now = Math.floor(Date.now() / 1000);

    // Entitlement: still has access if active/trial/grace, or cancelled but paid period not over.
    const entitled =
      ['active', 'on_trial', 'past_due'].includes(status) ||
      (status === 'cancelled' && currentPeriodEnd > now);

    await setUserDoc(uid, {
      subscriptionId,
      // Keep the app's existing `=== 'active'` check working by normalizing.
      subscriptionStatus: entitled ? 'active' : status,
      lsStatus: status,
      currentPeriodEnd,
      planInterval: 'month',
      customerPortalUrl: attr?.urls?.customer_portal || null,
      billingProvider: 'lemonsqueezy',
    });

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('LS webhook handler error:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
