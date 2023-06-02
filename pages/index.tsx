import React from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/Banner";
import CoffeeCard from "@/components/CoffeeCard";
import Heading from "@/components/Heading";

import coffeeStore from "@/data/coffee-stores.json";

const inter = Inter({ subsets: ["latin"] });

type CoffeeStoreTypes = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
};

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

        <section className={styles.section}>
          <Heading heading="Coffee stores near you." />

          <div className={styles.subContainer}>
            {coffeeStore.map((store: CoffeeStoreTypes) => (
              <CoffeeCard
                key={store.id}
                href={store.id}
                imageUrl={store.imgUrl}
                title={store.name}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
