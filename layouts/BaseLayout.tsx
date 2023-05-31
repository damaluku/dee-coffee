import React, { ReactElement } from "react";
import styles from "@/styles/Baselayout.module.css";

interface Props {
  children: ReactElement;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default BaseLayout;
