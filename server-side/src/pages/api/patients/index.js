// src/pages/api/patients/index.js

import { PrismaClient } from '@prisma/client'
import { getAuth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { userId } = getAuth(req);  

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
        const patients = await prisma.patient.findMany();
        res.status(200).json(patients);
      } catch (error) {
        res.status(500).json({ error: "Error fetching patients" });
      }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}