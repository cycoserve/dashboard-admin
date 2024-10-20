import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const imagesCollection = collection(db, 'gallery');
      const imagesSnapshot = await getDocs(imagesCollection);
      const images = imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching images' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, url, description } = req.body;
      const imagesCollection = collection(db, 'gallery');
      const newImage = await addDoc(imagesCollection, { title, url, description, createdAt: new Date() });
      res.status(201).json({ id: newImage.id, message: 'Image added to gallery successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding image to gallery' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}