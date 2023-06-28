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
    <div className={styles.cardCover}>
      <div className={`${styles.container} glass`}>
        <Link href={`/coffee-stores/${href}`}>
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl.length ? imageUrl : "/static/mesh-gradient.png"}
              fill
              alt={title}
              sizes="(max-width: 768px) 300px, (max-width: 1200px) 350px, 350px"
            />
          </div>
          <div className={styles.content}>
            <h2>{title}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CoffeeCard;
