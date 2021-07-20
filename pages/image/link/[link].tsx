import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactElement, useState, useEffect, Fragment } from 'react';
import { ImageDetail } from '../../../types';
import BasicLayout from '../../../layouts';
import Loader from '../../../components/Loader';
import ImageDetailCard from '../../../components/ImageDetailCard';

const SingleImage: FC<ImageDetail> = (props): ReactElement => {
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.link) {
      fetchImages(router.query.link as string);
    }
  }, [router]);

  const fetchImages = async (link: string) => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/image?link=${link}`);
      setImages(result.data.images);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return (
    <BasicLayout>
      <Head>
        <title>{router.query.link} | Images</title>
        <meta
          name="description"
          content={`Images generated from link ${router.query.link}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Image excalidraw" key="title" />
      </Head>
      <h2 style={{ textAlign: 'center' }}>
        Images generated from link:{router.query.link}
      </h2>
      {loading && <Loader />}
      <div className={'images-container'}>
        {images.map((img, index) => (
          <ImageDetailCard
            key={index + img.name + img.link}
            {...img}
            showDownloadBtn={true}
          />
        ))}
      </div>
    </BasicLayout>
  );
};

export default SingleImage;
