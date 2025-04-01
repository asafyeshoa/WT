import axios from "axios";
import { MemeResponse } from "@/types/memes.types";
import { BASE_URL } from "@/constants/config";

export const getMemes = async (page = 1, limit = 10): Promise<MemeResponse> => {
  const response = await axios.get(`${BASE_URL}/memes`, {
    params: { page, limit },
  });

  return response.data;
};

export const updateMeme = async (_id: string, updates: { name: string }) => {
  const response = await axios.put(`${BASE_URL}/memes/${_id}`, updates);
  return response.data;
};
