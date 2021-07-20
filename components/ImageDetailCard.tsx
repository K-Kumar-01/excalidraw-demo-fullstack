import { FC, ReactElement } from 'react';
import Link from 'next/link';

import { ImageDetail } from '../types';

import styles from '../styles/imagedetailcard.module.css';

const ImageDetailCard: FC<ImageDetail> = ({ name, link }): ReactElement => {
  return (
    <div className={styles.card}>
      <div>
        <span className={styles.desc}>Link from which file was created: </span>
        <Link href={`/link/${link}`}>
          <a href={`/link/${link}`} className={styles.link}>
            {link}
          </a>
        </Link>
      </div>
      <div>
        <span className={styles.desc}>Image Name: </span>
        <Link href={`/image/${name}`}>
          <a href={`/image/${name}`} className={styles.link}>
            {name}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ImageDetailCard;
