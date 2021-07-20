import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { promises } from 'fs';

const { readFile, readdir, writeFile } = promises;

const getallImages = async () => {
  try {
    let fileNames = await readdir('./public');
    fileNames = fileNames.filter((name) => !name.endsWith('ico'));
    let isErrorThere = false;
    const filesContents = await Promise.all(
      fileNames.map(async (file) => {
        try {
          const content = await readFile(`./public/${file}`, 'utf8');
          return content;
        } catch (error) {
          isErrorThere = true;
          return '';
        }
      })
    );
    if (isErrorThere) {
      throw new Error('Error in reading files');
    }
    return filesContents;
  } catch (error) {
    throw new Error(error);
  }
};

const getSingleImage = async (imageName: string) => {
  try {
    const content = await readFile(`./public/${imageName}`, 'utf8');
    return content;
  } catch (error) {
    throw new Error(error);
  }
};

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let { svgString, name } = req.body;
    svgString = JSON.parse(svgString);

    try {
      const file = await writeFile(`./public/${name}.svg`, svgString);
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).end();
    }
  } else if (req.method === 'GET') {
    try {
      if (!req.query.name) {
        const allImages = await getallImages();
        res.status(200).json({ allImages });
      } else {
        const image = await getSingleImage(req.query.name as string);
        res.status(200).json({ image });
      }
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default image;
