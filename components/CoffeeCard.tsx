import Image from "next/image";
import React from "react";
import styles from "@/styles/CoffeeCard.module.css";
import Link from "next/link";

type Props = {
  href: number | string;
  title: string;
  imageUrl: string;
};

const CoffeeCard: React.FC<Props> = ({ href, imageUrl, title }) => {
  return (
    <div className={`${styles.container} glass`}>
      <Link href={`/coffee-stores/${href}`}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl.length ? imageUrl : "/static/tiger-head.svg"}
            fill
            alt={title}
          />
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default CoffeeCard;
