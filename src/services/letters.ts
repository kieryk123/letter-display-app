import { ApiData } from "../models/api";

export const fetchLetter = async (id: number): Promise<ApiData> => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/letters/${id}`);

  if (res.status === 418) {
    throw new Error("Server responded with status 418");
  }

  return res.json();
};
