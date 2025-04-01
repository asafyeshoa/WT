import { Meme } from "@/types/memes.types";

export interface EditMemeModalProps {
  meme: Meme;
  onClose: () => void;
  onSave: (updates: { name: string }) => void;
}
