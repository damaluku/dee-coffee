import React from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/Banner";
import CoffeeCard from "@/components/CoffeeCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleBannerButtonClick = async () => {
    console.log("handleBannerButtonClick");
  };
  return (
    <>
      <Head>
        <title>Dee Coffee</title>
        <meta name="description" content="coffee shop finder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleBannerButtonClick={handleBannerButtonClick}
        />
      </main>
    </>
  );
}
