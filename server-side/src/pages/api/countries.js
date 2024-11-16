// src/pages/api/countries.js

import { PrismaClient } from '@prisma/client'
import { getAuth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const countries = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
          flag: true,
        },
      })
      res.status(200).json(countries)
    } catch (error) {
      console.error('Error fetching countries:', error)
      res.status(500).json({ error: 'Error fetching countries' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}