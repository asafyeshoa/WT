import { Meme } from "@/types/memes.types";

export interface MemeCardProps {
  meme: Meme;
  onEdit: (meme: Meme) => void;
}
