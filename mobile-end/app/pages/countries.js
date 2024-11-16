import { apiClient } from '../lib/api';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await apiClient.get('/countries');
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not fetch countries', error);
      res.status(500).json({ error: 'Error fetching countries' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}