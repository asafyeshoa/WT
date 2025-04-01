import React, { FC } from "react";
import styles from "../styles/MemeCard.module.css";
import { MemeCardProps } from "@/types/components/meme-card.types";

const MemeCard: FC<MemeCardProps> = ({ meme, onEdit }) => {
  return (
    <div className={styles.card}>
      <img src={meme.url} alt={meme.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{meme.name}</h3>
        <button className={styles.button} onClick={() => onEdit(meme)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
