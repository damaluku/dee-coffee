import React from "react";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/Banner";
import CoffeeCard from "@/components/CoffeeCard";
import Heading from "@/components/Heading";

import { GetStaticProps, InferGetStaticPropsType } from "next";

import coffeeStore from "@/data/coffee-stores.json";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export type CoffeeStoreTypes = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
};

export default function Home({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

        {stores.length > 0 ? (
          <section className={styles.section}>
            <Link href="/coffee-stores">
              <Heading heading="Coffee stores near you" />
            </Link>

            <div className={styles.subContainer}>
              {stores.map((store: CoffeeStoreTypes) => (
                <CoffeeCard
                  key={store.id}
                  href={store.id}
                  imageUrl={store.imgUrl}
                  title={store.name}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className={styles.noStores}>
            <h3>No stores found</h3>
          </div>
        )}

        {stores.length > 0 && (
          <section className={styles.section}>
            <Heading heading="Toronto Coffee stores" />

            <div className={styles.subContainer}>
              {stores.map((store: CoffeeStoreTypes) => (
                <CoffeeCard
                  key={store.id}
                  href={store.id}
                  imageUrl={store.imgUrl}
                  title={store.name}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const stores = coffeeStore;

  if (!stores) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stores,
    },
  };
};
