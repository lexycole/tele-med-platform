// src/pages/api/patients/create.js
import { PrismaClient } from '@prisma/client'
import { getAuth } from '@clerk/nextjs/server'
import multer from 'multer'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Request method body:', req.body);
  console.log('Request content length:', req.headers['content-length']);

  try {
       // Get the session and user ID
       const { userId, sessionId, getToken } = getAuth(req);
    
       if (!userId || !sessionId) {
         return res.status(401).json({ error: 'Unauthorized' });
       }
   
       // Get the session token
       const token = await getToken();
       
       if (!token) {
         return res.status(401).json({ error: 'No token provided' });
       }

    if (req.method === 'POST') {
      try {
        console.log('Starting file upload');
        await runMiddleware(req, res, upload.single('image'));
        console.log('File upload complete');

        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);

        const {
          firstName,
          lastName,
          birthDate,
          gender,
          prefix,
          mobile,
          productName,
          quantity,
          price,
          amount,
          currency,
          reference,
          status,
          note,
          patient,
        } = req.body;

        let imageSrc = null;
        if (req.file) {
          imageSrc = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
          console.log('Image size (bytes):', req.file.size);
        }

          let parsedBirthDate;
          if (birthDate) {
              // Attempt to parse the date string
              parsedBirthDate = new Date(birthDate);
              
              // Check if the parsed date is valid
              if (isNaN(parsedBirthDate.getTime())) {
              throw new Error('Invalid birth date provided');
              }
          } else {
              parsedBirthDate = null;
          }

        console.log('Creating new patient in database');
        const newPatient = await prisma.patient.create({
          data: {
            firstName,
            lastName,
            birthDate: parsedBirthDate,
            imageSrc,
            gender,
            prefix,
            mobile,
            productName,
            // quantity: quantity ? parseInt(quantity) : null,
            quantity,
            // price: price ? parseFloat(price) : null,
            price,
            // amount: amount ? parseFloat(amount) : null,
            amount,
            currency,
            reference,
            status,
            note,
            patient,
            userId,
          },
        });
        console.log('New patient created:', newPatient.id);

        res.status(201).json(newPatient);
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: error.message || "Error creating patient" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    } 
  } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
}