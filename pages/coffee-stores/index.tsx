import Link from "next/link";
import React from "react";
import styles from "@/styles/CoffeeShops.module.css";
import CoffeeCard from "@/components/CoffeeCard";

import coffeeStore from "@/data/coffee-stores.json";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { CoffeeStoreTypes } from "..";

const CoffeeStores = ({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Coffee Stores</h1>
      <Link href="/" className={styles.button}>
        Back to home
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
    </div>
  );
};

export default CoffeeStores;

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
