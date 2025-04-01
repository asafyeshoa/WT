export interface Meme {
  _id: string;
  name: string;
  url: string;
}

export interface MemeResponse {
  data: Meme[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MemeCardProps {
  meme: Meme;
}
