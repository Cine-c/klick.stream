import { verifyFirebaseToken } from '../../../lib/verify-firebase-token';
import { getUserDoc } from '../../../lib/firestore-admin';

// Lemon Squeezy provides a per-subscription "customer portal" URL, which we
// store on the user doc from the webhook. This returns it so the user can
// manage / cancel their subscription.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization || '';
    const idToken = authHeader.replace('Bearer ', '');
    const { uid } = await verifyFirebaseToken(idToken);

    const userDoc = await getUserDoc(uid);
    const url = userDoc?.customerPortalUrl;
    if (!url) {
      return res.status(404).json({ error: 'No subscription to manage' });
    }

    return res.status(200).json({ url });
  } catch (err) {
    console.error('lemonsqueezy create-portal error:', err);
    if (err.message?.toLowerCase().includes('token')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(500).json({ error: 'Failed to open portal' });
  }
}
