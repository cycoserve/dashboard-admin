import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clientsCollection = collection(db, 'clients');
      const clientsSnapshot = await getDocs(clientsCollection);
      const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching clients' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, company } = req.body;
      const clientsCollection = collection(db, 'clients');
      const newClient = await addDoc(clientsCollection, { name, email, company, createdAt: new Date() });
      res.status(201).json({ id: newClient.id, message: 'Client created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating client' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}