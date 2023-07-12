import React from "react";
import { useQuery } from "react-query";
import { ApiData } from "../models/api";
import { fetchLetter } from "../services/letters";

interface HookConfig {
  id: number;
  intervalMs?: number;
}

export const useFetchLetters = ({ id, intervalMs = 2000 }: HookConfig) => {
  const [letters, setLetters] = React.useState("");

  const { refetch } = useQuery<ApiData, Error>(
    ["letter", id],
    () => fetchLetter(id),
    {
      enabled: false,
      retry: false,
    }
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch().then((data) => {
        if (data.data) {
          if (letters.length >= 30) {
            setLetters((letters + data.data.letter).slice(-30));
          } else {
            setLetters(letters + data.data.letter);
          }
        }
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [id, letters, refetch]);

  return { letters };
};
