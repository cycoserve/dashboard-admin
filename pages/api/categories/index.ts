import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description } = req.body;
      const categoriesCollection = collection(db, 'categories');
      const newCategory = await addDoc(categoriesCollection, { name, description });
      res.status(201).json({ id: newCategory.id, message: 'Category created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}