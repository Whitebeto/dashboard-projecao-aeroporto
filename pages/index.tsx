import type { NextPage } from 'next';
import Head from 'next/head';
import AirportBoard from '../components/AirportBoard';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard – Projeção Aeroporto</title>
        <meta name="description" content="Dashboard de projeção de dados do aeroporto em tempo real." />
        <link rel="icon" href="/dashboard-projecao-aeroporto/favicon.ico" />
      </Head>
      <AirportBoard />
    </>
  );
};

export default Index;
