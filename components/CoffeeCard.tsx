import Image from "next/image";
import React from "react";
import styles from "@/styles/CoffeeCard.module.css";

const CoffeeCard = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/static/tiger-head.svg"
        width={350}
        height={350}
        alt="banner image"
      />
    </div>
  );
};

export default CoffeeCard;
