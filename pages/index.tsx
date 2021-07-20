import { Fragment } from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Excalidraw demo</title>
        <meta name="description" content="Excalidraw demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hello</div>
    </Fragment>
  );
}
