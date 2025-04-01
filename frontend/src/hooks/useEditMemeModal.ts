import { useState, useEffect, useRef } from "react";

export const useEditMemeModal = (
  initialName: string,
  onClose: () => void,
  onSave: (data: { name: string }) => void
) => {
  const [name, setName] = useState(initialName);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onSave({ name });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEnter);
    };
  }, [name, onClose, onSave]);

  return { name, setName, modalRef };
};
