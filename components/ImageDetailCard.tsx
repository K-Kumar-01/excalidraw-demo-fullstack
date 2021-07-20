import { FC, ReactElement } from 'react';
import Link from 'next/link';

import { ImageDetail } from '../types';

import styles from '../styles/imagedetailcard.module.css';

interface ImageDetailCardProps extends ImageDetail {
  showDownloadBtn?: boolean;
}

const ImageDetailCard: FC<ImageDetailCardProps> = ({
  name,
  link,
  svgString,
  showDownloadBtn = false,
}): ReactElement => {
  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.parse(svgString)], {
      type: 'image/svg+xml;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = name.endsWith('.svg') ? name : name + '.svg';
    document.body.appendChild(element);
    element.click();
  };
  return (
    <div className={styles.card}>
      {showDownloadBtn && <button onClick={downloadTxtFile}>Download</button>}
      <div>
        <span className={styles.desc}>Link from which file was created: </span>
        <Link href={`/image/link/${link}`}>
          <a href={`/image/link/${link}`} className={styles.link}>
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
