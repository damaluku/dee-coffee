import React, { useEffect, useState, useContext } from "react";

import Head from "next/head";

import styles from "@/styles/Home.module.css";

import Banner from "@/components/Banner";
import CoffeeCard from "@/components/CoffeeCard";
import Heading from "@/components/Heading";

import { GetStaticProps, InferGetStaticPropsType } from "next";

import Link from "next/link";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { ACTION_TYPES, useStoreContext } from "@/store/context";

export type CoffeeStoreTypes = {
  fsq_id: string;
  name: string;
  address: string;
  neighbourhood: string;
  voting: number;
  imgUrl: string | null;
  cross_street: string;
  locality: string;
  formatted_address: string;
  distance: number;
};

export default function Home({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    handleTrackLocation,
    // latlong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();

  const { dispatch, state } = useStoreContext();

  const { latlong, coffeeStores } = state;

  const [coffeeStoresError, setCoffeeStoresError] = useState<string | null>(
    null
  );

  const handleUpdateLocation = async () => {
    try {
      const response = await fetch(
        `/api/fetchCoffeeStores?latlong=${latlong}&limit=5`
      );

      const data = await response.json();

      const coffeeStores = data.stores;

      dispatch({
        type: ACTION_TYPES.SET_COFFEE_STORES,
        payload: {
          coffeeStores,
        },
      });

      setCoffeeStoresError(null);
    } catch (error: any) {
      console.log(error);
      setCoffeeStoresError(error?.message ? error?.message : error);
    }
  };

  useEffect(() => {
    if (latlong) {
      handleUpdateLocation();
    }
  }, [latlong]);

  const handleBannerButtonClick = async () => {
    handleTrackLocation();
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
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleBannerButtonClick={handleBannerButtonClick}
        />

        <div>
          {locationErrorMessage && (
            <p>Something went wrong: {locationErrorMessage}</p>
          )}
        </div>

        <div>
          {coffeeStoresError && (
            <p>Something went wrong: {coffeeStoresError}</p>
          )}
        </div>

        {coffeeStores?.length > 0 && (
          <section className={styles.section}>
            <Heading heading="Coffee stores near me" />

            <div className={styles.subContainer}>
              {coffeeStores.slice(0, 7).map((store: CoffeeStoreTypes) => (
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

        {stores.length > 0 && (
          <section className={styles.section}>
            <Link href="/coffee-stores">
              <Heading heading="Abuja Coffee stores" />
            </Link>

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

  return {
    props: {
      stores: stores ? stores : [],
    },
  };
};
