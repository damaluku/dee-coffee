import React from "react";
import Link from "next/link";

import styles from "@/styles/CoffeeShopDetails.module.css";

import { GetStaticProps, InferGetStaticPropsType } from "next";

import coffeeStores from "@/data/coffee-stores.json";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { MdLocationPin } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { CoffeeStoreTypes } from "..";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

const CoffeeStoreDetails = ({
  store,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    );
  }

  /*  const data = [
    {
      fsq_id: "5c378bf08194fc002cde8d85",
      categories: [
        {
          id: 13035,
          name: "Coffee Shop",
          icon: {
            prefix: "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
            suffix: ".png",
          },
        },
      ],
      chains: [],
      distance: 2061,
      geocodes: {
        main: {
          latitude: 9.067433,
          longitude: 7.48558,
        },
      },
      link: "/v3/places/5c378bf08194fc002cde8d85",
      location: {
        address: "Silverbird Entertainment Centre",
        country: "NG",
        cross_street: "",
        formatted_address:
          "Silverbird Entertainment Centre, Abuja, Federal Capital Territory",
        locality: "Abuja",
        region: "Federal Capital Territory",
      },
      name: "Honey",
      related_places: {},
      timezone: "Africa/Lagos",
    },
  ]; */

  const { name, distance, location } = store;

  const handleUpVote = () => {
    console.log("handleUpVote");
  };
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.section1}>
          <Link href="/">
            <BiArrowBack /> Back to home
          </Link>

          <p>{name}</p>
        </section>
        <section className={styles.section2}>
          <div className={styles.imageContainer}>
            <Image
              src={store.imgUrl || "/static/tiger-head.svg"}
              fill
              alt={name}
            />
          </div>

          <div className={styles.infoContainer}>
            {location.address && (
              <p>
                <span>
                  <MdLocationPin />
                </span>
                {location.address || location.formatted_address}
              </p>
            )}

            {location.cross_street && (
              <p>
                <span>
                  <FaLocationArrow />
                </span>
                {location.cross_street
                  ? location.cross_street
                  : location.locality}
              </p>
            )}

            {distance && (
              <p>
                <span>Distance:</span>
                {distance}
              </p>
            )}

            <button onClick={handleUpVote}>up vote</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default CoffeeStoreDetails;

export const getStaticProps: GetStaticProps = async (context) => {
  const { id }: any = context.params;

  const stores = await fetchCoffeeStores();

  if (!stores) {
    return {
      notFound: true,
    };
  }

  const store = stores.find(
    (store: CoffeeStoreTypes) => store.fsq_id.toString() === id
  );

  if (!store) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      store,
    },
  };
};

export const getStaticPaths = async (context: any) => {
  const stores = await fetchCoffeeStores();

  const paths = stores.map((store: CoffeeStoreTypes) => {
    return {
      params: {
        id: store.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
