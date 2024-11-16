// src/pages/api/patients/[id]/update.js

import { PrismaClient } from '@prisma/client'
import { getAuth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { firstName, lastName, email, phone, birthDate } = req.body;

    try {
      const updatedPatient = await prisma.patient.update({
        where: { id: parseInt(id) },
        data: {
          firstName,
          lastName,
          email,
          phone,
          birthDate: new Date(birthDate),
        },
      });

      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: "Error updating patient" });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}