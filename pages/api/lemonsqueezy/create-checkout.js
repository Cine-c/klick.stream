import { createCheckout } from '../../../lib/lemonsqueezy';
import { verifyFirebaseToken } from '../../../lib/verify-firebase-token';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify Firebase auth (same token the app/site already sends)
    const authHeader = req.headers.authorization || '';
    const idToken = authHeader.replace('Bearer ', '');
    const { uid, email } = await verifyFirebaseToken(idToken);

    const origin = req.headers.origin || 'https://klick.stream';
    const url = await createCheckout({
      email,
      uid,
      redirectUrl: `${origin}/premium?success=1`,
    });

    return res.status(200).json({ url });
  } catch (err) {
    console.error('lemonsqueezy create-checkout error:', err);
    if (err.message?.toLowerCase().includes('token')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (err.message?.includes('not configured')) {
      return res.status(500).json({ error: 'Payments not configured' });
    }
    return res.status(500).json({
      error: 'Failed to create checkout session',
      _debug: {
        msg: String(err && err.message).slice(0, 240),
        keyPresent: !!process.env.LEMONSQUEEZY_API_KEY,
        keyLen: (process.env.LEMONSQUEEZY_API_KEY || '').length,
        store: process.env.LEMONSQUEEZY_STORE_ID || null,
        variant: process.env.LEMONSQUEEZY_VARIANT_ID || null,
      },
    });
  }
}
