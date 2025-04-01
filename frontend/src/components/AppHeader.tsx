import { FC } from "react";
import styles from "@/styles/AppHeader.module.css";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Meme Collectio<span className={styles.letterN}>n</span>
      </h1>
      <div className={styles.imageWrapper}>
        <img src="/favicon.svg" alt="Icon" className={styles.imageImage} />
      </div>
    </header>
  );
};

export default AppHeader;
