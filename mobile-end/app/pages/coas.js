import { apiClient } from '../lib/api';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await apiClient.get('/coas');
      console.log('coas response: ', response )
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not fetch coas', error);
      res.status(500).json({ error: 'Error fetching coas' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}