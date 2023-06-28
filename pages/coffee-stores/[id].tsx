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

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const CoffeeStoreDetails = ({
  store,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const { id } = router?.query;

  const [coffeeStore, setCoffeeStore] = useState<CoffeeStoreTypes>(store || {});
  const [votingCount, setVotingCount] = useState<number>(0);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const {
    state: { coffeeStores },
  } = useStoreContext();

  const { data: SwrData, error: SwrError } = useSWR(
    `/api/getCoffeeStoreByid?id=${id}`,
    fetcher
    // { refreshInterval: 1000 }
  );

  const handleSetSWRData = () => {
    if (SwrData && SwrData.length > 0) {
      setCoffeeStore(SwrData[0]);
      setVotingCount(SwrData[0]?.voting);
    }
  };

  useEffect(() => {
    handleSetSWRData();
  }, [SwrData]);

  // if (router.isFallback) {
  //   return (
  //     <div className={styles.loader}>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

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
    } catch (error) {
      console.log("Error creating coffee store", error);
    }
  };

  const handleCheckIsEmpty = async () => {
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

  if (SwrError) {
    return (
      <div className={styles.loader}>
        <p>Somthing went wrong retrieving store page.</p>
      </div>
    );
  }

  const {
    name,
    distance,
    imgUrl,
    address,
    formatted_address,
    cross_street,
    locality,
  } = coffeeStore;

  const handleUpVote = async () => {
    try {
      setIsVoting(true);

      const response = await fetch("/api/upVoteByid", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const dbCoffeeStore = await response.json();

      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = votingCount + 1;
        setVotingCount(count);
      }

      setIsVoting(false);
    } catch (error) {
      console.log("Error upvoting store", error);
      setIsVoting(false);
    }
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
              alt={name ? name : "store image"}
              fill
              priority
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
              {isVoting ? <i>voting...</i> : votingCount}
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

  const store = stores.find(
    (store: CoffeeStoreTypes) => store.fsq_id.toString() === id
  );

  // if (!store) {
  //   return {
  //     notFound: true,
  //   };
  // }

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
