import { useQuery } from "@tanstack/react-query";
import gamesData from "../../../data/games.json";

export function useGame(id: number) {
  return useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return gamesData.find((g) => g.id === id);
    },
    enabled: !!id, 
  });
}
