// src/pages/api/patients/[id].js

import { PrismaClient } from '@prisma/client'
import { getAuth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const patient = await prisma.patient.findUnique({
                where: { id: parseInt(id) },
            });

            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ error: "Error fetching patient" });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.patient.delete({
                where: { id: parseInt(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: "Error deleting patient" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}