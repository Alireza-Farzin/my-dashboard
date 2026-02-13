import { useInfiniteQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  brand: string;
}

const ITEMS_PER_PAGE = 12;

export function useProducts() {
  return useInfiniteQuery<{ products: Product[]; total: number }, Error>({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number) || 0;
      const skip = page * ITEMS_PER_PAGE;
      
      const res = await fetch(
        `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`
      );
      if (!res.ok) throw new Error("خطا در دریافت محصولات");
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap(p => p.products).length;
      return loadedItems < lastPage.total ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
}