import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/styles/CoffeeShopDetails.module.css";

import { GetStaticProps, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { MdLocationPin } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { CoffeeStoreTypes } from "..";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { useStoreContext } from "@/store/context";
import { isEmpty } from "@/utils";

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

  const { id } = router?.query;

  const [coffeeStore, setCoffeeStore] = useState(store || {});

  const {
    state: { coffeeStores },
  } = useStoreContext();

  useEffect(() => {
    if (!isEmpty(store)) {
      if (coffeeStores?.length > 0) {
        const store = coffeeStores.find(
          (store: CoffeeStoreTypes) => store.fsq_id.toString() === id
        );

        setCoffeeStore(store);
      }
    }
  }, [id]);

  const { name, distance, location } = coffeeStore;

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
              src={coffeeStore.imgUrl || "/static/mesh-gradient.png"}
              fill
              alt={name}
              sizes="(max-width: 768px) 450px, (max-width: 1200px) 450px, 450px"
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
      store: store ? store : {},
    },
  };
};

export const getStaticPaths = async (context: any) => {
  const stores = await fetchCoffeeStores();

  const paths = stores?.map((store: CoffeeStoreTypes) => {
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
