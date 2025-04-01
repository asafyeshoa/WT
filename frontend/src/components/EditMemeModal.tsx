import React, { FC } from "react";
import styles from "../styles/EditMemeModal.module.css";
import { EditMemeModalProps } from "@/types/components/edit-meme-modal.types";
import { useEditMemeModal } from "@/hooks/useEditMemeModal";

const EditMemeModal: FC<EditMemeModalProps> = ({ meme, onClose, onSave }) => {
  const { name, setName, modalRef } = useEditMemeModal(
    meme.name,
    onClose,
    onSave
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h2 className={styles.title}>Edit Meme</h2>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={() => onSave({ name })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemeModal;
