import { setSharedList, getSharedList } from '../../../lib/firestore-admin';
import { randomBytes } from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items must be a non-empty array' });
    }

    try {
      const shareId = randomBytes(6).toString('hex');
      await setSharedList(shareId, {
        items,
        createdAt: new Date().toISOString(),
      });

      return res.status(200).json({ shareId, url: `/list/${shareId}` });
    } catch (err) {
      console.error('Error creating shared list:', err);
      return res.status(500).json({ error: 'Failed to create shared list' });
    }
  } else if (req.method === 'GET') {
    const { shareId } = req.query;

    if (!shareId) {
      return res.status(400).json({ error: 'Missing shareId parameter' });
    }

    try {
      const data = await getSharedList(shareId);
      if (!data) {
        return res.status(404).json({ error: 'Shared list not found' });
      }
      return res.status(200).json(data);
    } catch (err) {
      console.error('Error fetching shared list:', err);
      return res.status(500).json({ error: 'Failed to fetch shared list' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
