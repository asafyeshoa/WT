import { FC } from "react";
import styles from "@/styles/Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src="/loading.svg" alt="Loading..." className={styles.loaderImage} />
      <h2 className={styles.loaderTitle}>Loading memes...</h2>
      </div>
  );
};

export default Loader;
