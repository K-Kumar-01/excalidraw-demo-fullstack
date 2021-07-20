import Link from 'next/link';
import { FC, ReactElement } from 'react';

const BasicLayout: FC = ({ children }): ReactElement => {
  return (
    <main>
      <div>
        <Link href="/">
          <a className="link">Home</a>
        </Link>
        <Link href="/image">
          <a className="link">Image</a>
        </Link>
      </div>
      {children}
    </main>
  );
};

export default BasicLayout;
