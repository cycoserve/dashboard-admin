import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const videosCollection = collection(db, 'videos');
      const videosSnapshot = await getDocs(videosCollection);
      const videos = videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching videos' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, url, channelId } = req.body;
      const videosCollection = collection(db, 'videos');
      const newVideo = await addDoc(videosCollection, { title, description, url, channelId, createdAt: new Date() });
      res.status(201).json({ id: newVideo.id, message: 'Video created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating video' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}