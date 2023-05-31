import Link from "next/link";
import React from "react";
import styles from "@/styles/CoffeeShops.module.css";
import CoffeeCard from "@/components/CoffeeCard";

const CoffeeStore = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Coffee Stores</h1>
      <Link href="/" prefetch className={styles.button}>
        Back to home
      </Link>

      <div className={styles.subContainer}>
        <div className={styles.cardContainer}>
          <CoffeeCard />
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
