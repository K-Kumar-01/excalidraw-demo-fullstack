import axios from 'axios';
import Head from 'next/head';
import { FC, ReactElement, useEffect, useState } from 'react';
import { ImageDetail } from '../../types';
import BasicLayout from '../../layouts';
import Loader from '../../components/Loader';
import ImageDetailCard from '../../components/ImageDetailCard';

const Image: FC = (): ReactElement => {
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await axios.get('/api/image');
      setLoading(false);
      setImages(fetchedImages.data.images);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <BasicLayout>
      <Head>
        <title>Image </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Image excalidraw" key="title" />
      </Head>
      <h2 style={{ textAlign: 'center' }}>All the images saved</h2>
      {loading && <Loader />}
      <div className={'images-container'}>
        {images.map((img, index) => (
          <ImageDetailCard key={index + img.name + img.link} {...img} />
        ))}
      </div>
    </BasicLayout>
  );
};
export default Image;
