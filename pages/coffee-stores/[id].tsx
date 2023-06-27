import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/styles/CoffeeShopDetails.module.css";

import { GetStaticProps, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { MdLocationPin } from "react-icons/md";
import { MdStar } from "react-icons/md";
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

  const { id } = router?.query;

  const [coffeeStore, setCoffeeStore] = useState<CoffeeStoreTypes>(store || {});
  const [votingCount, setVotingCount] = useState<number>(1);

  // if (router.isFallback) {
  //   return (
  //     <div className={styles.loader}>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  const {
    state: { coffeeStores },
  } = useStoreContext();

  const handleCreateCoffeeStore = async (coffeeStore: CoffeeStoreTypes) => {
    try {
      const {
        fsq_id,
        name,
        address,
        neighbourhood,
        voting,
        imgUrl,
        cross_street,
        locality,
        formatted_address,
        distance,
      } = coffeeStore;

      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fsq_id,
          name,
          address,
          neighbourhood,
          voting,
          imgUrl,
          cross_street,
          locality,
          formatted_address,
          distance,
        }),
      });

      const dbCoffeeStore = await response.json();

      // console.log(dbCoffeeStore);
    } catch (error) {
      console.log("Error creating coffee store", error);
    }
  };

  const handleCheckIsEmpty = () => {
    if (isEmpty(store)) {
      if (coffeeStores?.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find(
          (store: CoffeeStoreTypes) => store.fsq_id.toString() === id
        );

        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      handleCreateCoffeeStore(store);
    }
  };

  useEffect(() => {
    handleCheckIsEmpty();
  }, [id, store]);

  const {
    name,
    distance,
    imgUrl,
    address,
    formatted_address,
    cross_street,
    locality,
  } = coffeeStore;

  const handleUpVote = () => {
    console.log("handleUpVote");
    let count = votingCount + 1;
    setVotingCount(count);
  };
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.section1}>
          <Link href="/coffee-stores">
            <BiArrowBack /> All stores
          </Link>

          <Link href="/">
            <BiArrowBack /> Home
          </Link>

          <p>{name}</p>
        </section>
        <section className={styles.section2}>
          <div className={styles.imageContainer}>
            <Image
              src={imgUrl || "/static/mesh-gradient.png"}
              fill
              alt={name ? name : "store image"}
              sizes="(max-width: 768px) 450px, (max-width: 1200px) 450px, 450px"
            />
          </div>

          <div className={styles.infoContainer}>
            {(address || formatted_address) && (
              <p>
                <span>
                  <MdLocationPin />
                </span>
                {address ? address : formatted_address}
              </p>
            )}

            {(cross_street || locality) && (
              <p>
                <span>
                  <FaLocationArrow />
                </span>
                {cross_street ? cross_street : locality}
              </p>
            )}

            {distance && (
              <p>
                <span>Distance:</span>
                {distance}
              </p>
            )}

            <p>
              <span>
                {/* <MdStar /> */}
                Votes:
              </span>
              {votingCount}
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

  const stores = await fetchCoffeeStores();

  // if (!stores) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const store = stores.find(
    (store: CoffeeStoreTypes) => store.fsq_id.toString() === id
  );

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
