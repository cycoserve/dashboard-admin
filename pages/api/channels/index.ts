import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const channelsCollection = collection(db, 'channels');
      const channelsSnapshot = await getDocs(channelsCollection);
      const channels = channelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(channels);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching channels' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, ownerId } = req.body;
      const channelsCollection = collection(db, 'channels');
      const newChannel = await addDoc(channelsCollection, { name, description, ownerId, createdAt: new Date() });
      res.status(201).json({ id: newChannel.id, message: 'Channel created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating channel' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}