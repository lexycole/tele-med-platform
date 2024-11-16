import { apiClient } from '../lib/api';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await apiClient.get('/patients');
      console.log('patients response: ', response);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not fetch patients', error);
      res.status(500).json({ error: 'Error fetching patients' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await apiClient.post('/patients/create', req.body);
      console.log('add patient response: ', response);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not add patient', error);
      res.status(500).json({ error: 'Error adding patient' });
    }
  } else if (req.method === 'PATCH') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }
    try {
      const response = await apiClient.patch(`/patients/${id}/update`, req.body);
      console.log('update patient response: ', response);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not update patient', error);
      res.status(500).json({ error: 'Error updating patient' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }
    try {
      const response = await apiClient.delete(`/patients/${id}`);
      console.log('delete patient response: ', response);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('could not delete patient', error);
      res.status(500).json({ error: 'Error deleting patient' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const response = await apiClient.get('/patients');
//       console.log('patients response: ', response )
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error('could not fetch patients', error);
//       res.status(500).json({ error: 'Error fetching patients' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }