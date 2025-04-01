export interface Meme {
  id: string;
  name: string;
  url: string;
  updatedName?: string;
  updatedTitle?: string;
}

export interface ImgFlipApiResponse {
  success: boolean;
  data: {
    memes: {
      id: string;
      name: string;
      url: string;
    }[];
  };
}
