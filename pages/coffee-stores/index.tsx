import Link from "next/link";
import React from "react";
import styles from "@/styles/CoffeeShops.module.css";
import CoffeeCard from "@/components/CoffeeCard";

const CoffeeStore = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Coffee Stores</h1>
      <Link href="/" className={styles.button}>
        Back to home
      </Link>

      <div className={styles.subContainer}>
        <CoffeeCard href="" imageUrl="" title="" />
      </div>
    </div>
  );
};

export default CoffeeStore;
