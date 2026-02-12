import { useInfiniteQuery } from "@tanstack/react-query";
import gamesData from "../../../data/games.json";

export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
  genres: string[];
}

const PAGE_SIZE = 8;

export function useGames() {
  return useInfiniteQuery<Game[], Error, Game[], ["games"], number>({
    queryKey: ["games"],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((res) => setTimeout(res, 400));
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return gamesData.slice(start, end);
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flat().length;

      if (loadedItems >= gamesData.length) {
        return undefined;
      }

      return allPages.length;
    },
    initialPageParam: 0,
  });

}
