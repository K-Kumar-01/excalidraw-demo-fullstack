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
    const { name, link } = req.query;

    interface findOptionsType {
      name?: string;
      link?: string;
    }
    const findOptions: findOptionsType = {};

    if (name) {
      findOptions.name = name as string;
    }
    if (link) {
      findOptions.link = link as string;
    }
    try {
      const images = await ImageModel.find(findOptions).exec();
      res.status(200).json({ images });
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default image;
