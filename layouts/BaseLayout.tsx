import React, { ReactElement } from "react";
import styles from "@/styles/Baselayout.module.css";

import { Cormorant } from "next/font/google";

interface Props {
  children: ReactElement;
}

const cormorant = Cormorant({ subsets: ["latin"] });

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className={cormorant.className}>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default BaseLayout;
