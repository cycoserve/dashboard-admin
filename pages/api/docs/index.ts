import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const docsCollection = collection(db, 'docs');
      const docsSnapshot = await getDocs(docsCollection);
      const docs = docsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(docs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching docs' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, author } = req.body;
      const docsCollection = collection(db, 'docs');
      const newDoc = await addDoc(docsCollection, { title, content, author, createdAt: new Date() });
      res.status(201).json({ id: newDoc.id, message: 'Doc created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating doc' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}