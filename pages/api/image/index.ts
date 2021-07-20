import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils';
import ImageModel from '../../../model';

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const image = await ImageModel.findOneAndUpdate(
        { name: req.body.name, link: req.body.link },
        { ...req.body },
        { new: true, upsert: true }
      );
      res.status(201).json({ success: true, data: image });
    } catch (error) {
      res.status(500).end();
    }
  } else if (req.method === 'GET') {
    try {
      const images = await ImageModel.find({}).exec();
      res.status(200).json({ images });
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default image;
