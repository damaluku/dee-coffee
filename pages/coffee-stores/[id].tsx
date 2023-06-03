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

  const { id, name, imgUrl, websiteUrl, address, neighbourhood } = store;

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
          <Link href="/">Back to home</Link>

          <p>{name}</p>
        </section>
        <section className={styles.section2}>
          <div className={styles.imageContainer}>
            <Image src={imgUrl} fill alt={name} />
          </div>

          <div className={styles.infoContainer}>
            <p>
              <span>
                <MdLocationPin />
              </span>
              {address}
            </p>
            <p>
              <span>
                <FaLocationArrow />
              </span>
              {neighbourhood}
            </p>

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

  const stores = coffeeStores;

  const store = stores.find((store) => store.id.toString() === id);

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
  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
