import { FC } from "react";
import styles from "@/styles/MemeSkeleton.module.css";

const MemeSkeleton: FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.textLine} />
      <div className={styles.button} />
    </div>
  );
};

export default MemeSkeleton;
