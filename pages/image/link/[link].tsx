import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, ReactElement, useState, useEffect, Fragment } from 'react';
import ImageDetailCard from '../../../components/ImageDetailCard';
import Loader from '../../../components/Loader';
import { ImageDetail } from '../../../types';

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
    <Fragment>
      <h2 style={{ textAlign: 'center' }}>
        Images with name:{router.query.name}
      </h2>
      {loading && <Loader />}
      <div className={'images-container'}>
        {images.map((img, index) => (
          <ImageDetailCard key={index + img.name + img.link} {...img} />
        ))}
      </div>
    </Fragment>
  );
};

export default SingleImage;
