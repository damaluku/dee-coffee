import React from "react";
import styles from "@/styles/Banner.module.css";
import Image from "next/image";

interface Props {
  buttonText: string;
  handleBannerButtonClick: () => void;
}
const Banner = ({ buttonText, handleBannerButtonClick }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.title}>
          <span className={styles.title1}>Dee</span>
          <span className={styles.title2}>Coffee</span>
        </h1>
        <p className={styles.subtitle}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Voluptatibus, maiores quas. Voluptatibus aliquid commodi quibusdam?
        </p>
        <button className={styles.button} onClick={handleBannerButtonClick}>
          {buttonText}
        </button>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/static/tiger-head.svg"
          width={350}
          height={350}
          alt="banner image"
        />
      </div>
    </div>
  );
};

export default Banner;
