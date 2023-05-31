import Image from "next/image";
import React from "react";
import styles from "@/styles/CoffeeCard.module.css";

const CoffeeCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/static/tiger-head.svg" fill alt="banner image" />
      </div>
      <div className={styles.content}>
        <h2>Coffee Card</h2>
      </div>
    </div>
  );
};

export default CoffeeCard;
