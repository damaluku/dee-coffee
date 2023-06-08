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
import { fetchCoffeeStores } from "@/lib/coffee-stores";

const inter = Inter({ subsets: ["latin"] });

interface Categories {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

export type CoffeeStoreTypes = {
  imgUrl: string | null;
  fsq_id: string;
  categories: Categories;
  chains: [];
  distance: number;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  link: string;
  location: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    region: string;
  };
  name: string;
  related_places: any;
  timezone: string;
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

        <div></div>

        {stores.length > 0 ? (
          <section className={styles.section}>
            <Link href="/coffee-stores">
              <Heading heading="Coffee stores near you" />
            </Link>

            <div className={styles.subContainer}>
              {stores.slice(0, 7).map((store: CoffeeStoreTypes) => (
                <CoffeeCard
                  key={store.fsq_id}
                  href={store.fsq_id}
                  imageUrl={store.imgUrl || "/static/mesh-gradient.png"}
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
              {stores.slice(0, 5).map((store: CoffeeStoreTypes) => (
                <CoffeeCard
                  key={store.fsq_id}
                  href={store.fsq_id}
                  imageUrl={store.imgUrl || "/static/mesh-gradient.png"}
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
  const stores = await fetchCoffeeStores();

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
