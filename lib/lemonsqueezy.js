// Lemon Squeezy integration (Merchant of Record) — edge/Workers compatible.
// Uses plain fetch + Web Crypto, mirroring the Firebase/Firestore helpers.
// Replaces Stripe for card subscriptions (Kenya-friendly payout via LS).

const LS_API = 'https://api.lemonsqueezy.com/v1';

/**
 * Create a hosted checkout for the monthly subscription.
 * Returns the Lemon Squeezy checkout URL to redirect the user to.
 * `uid` is echoed back to us in subscription webhooks via meta.custom_data.
 */
export async function createCheckout({ email, uid, redirectUrl }) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  if (!apiKey || !storeId || !variantId) {
    throw new Error('Lemon Squeezy not configured');
  }

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          email,
          // custom values must be strings; echoed back in the webhook payload.
          custom: { user_id: uid },
        },
        product_options: {
          redirect_url: redirectUrl,
          receipt_button_text: 'Back to Klick',
        },
      },
      relationships: {
        store: { data: { type: 'stores', id: String(storeId) } },
        variant: { data: { type: 'variants', id: String(variantId) } },
      },
    },
  };

  const res = await fetch(`${LS_API}/checkouts`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Lemon Squeezy checkout failed: ${res.status} ${detail}`);
  }

  const json = await res.json();
  const url = json?.data?.attributes?.url;
  if (!url) throw new Error('Lemon Squeezy returned no checkout URL');
  return url;
}

/**
 * Verify the X-Signature header on an incoming webhook.
 * LS signs the raw request body with HMAC-SHA256 (hex) using the webhook secret.
 */
export async function verifyWebhookSignature(rawBody, signatureHex) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) throw new Error('Lemon Squeezy webhook secret not configured');
  if (!signatureHex) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, rawBody);
  const expected = [...new Uint8Array(mac)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return timingSafeEqualHex(expected, signatureHex.toLowerCase());
}

function timingSafeEqualHex(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
