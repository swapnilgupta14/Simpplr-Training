import axiosInstance from "./AxiosIntance";
import { CharacterResponse } from "../types";

export const fetchCharacters = async (
  page: number
): Promise<CharacterResponse> => {
  try {
    const response = await axiosInstance.get<CharacterResponse>("/character", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An unknown error occurred");
  }
};
