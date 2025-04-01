import type { AppProps } from "next/app";
import Head from "next/head";
import AppHeader from "@/components/AppHeader";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Meme Browser</title>
        <meta name="description" content="Browse and edit memes" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AppHeader />
      <main style={{ padding: "2rem 1rem" }}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
