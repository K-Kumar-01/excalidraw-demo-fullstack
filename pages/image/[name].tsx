import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, ReactElement, useState, useEffect, Fragment } from 'react';
import ImageDetailCard from '../../components/ImageDetailCard';
import Loader from '../../components/Loader';
import BasicLayout from '../../layouts';
import { ImageDetail } from '../../types';

const SingleImage: FC<ImageDetail> = (props): ReactElement => {
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.name) {
      fetchImages(router.query.name as string);
    }
  }, [router]);

  const fetchImages = async (imageName: string) => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/image?name=${imageName}`);
      setImages(result.data.images);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return (
    <BasicLayout>
      <h2 style={{ textAlign: 'center' }}>
        Images with name:{router.query.name}
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
