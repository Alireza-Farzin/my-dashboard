"use client";

import { useMemo, useState } from "react";
import { Game } from "../interface";
import { SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";


export function useGameFilters(allGames: Game[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<SelectOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(null);
  const [minRating, setMinRating] = useState(0);

  const genreOptions = useMemo(() => {
    const genres = new Set<string>();
    allGames.forEach((game) => {
      game.genres.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres)
      .sort()
      .map((genre, index) => ({
        id: index,
        label: genre,
        value: genre,
      }));
  }, [allGames]);

  const yearOptions = useMemo(() => {
    const years = new Set<number>();
    allGames.forEach((game) => {
      const year = new Date(game.released).getFullYear();
      if (!isNaN(year)) years.add(year);
    });
    return Array.from(years)
      .sort((a, b) => b - a)
      .map((year) => ({
        id: year,
        label: year.toString(),
        value: year,
      }));
  }, [allGames]);

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      if (
        searchQuery &&
        !game.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }


      if (selectedGenres.length > 0) {
        const hasMatchingGenre = selectedGenres.some((genre) =>
          game.genres.includes(genre.value as string)
        );
        if (!hasMatchingGenre) return false;
      }

      if (selectedYear) {
        const gameYear = new Date(game.released).getFullYear();
        if (gameYear !== (selectedYear.value as number)) return false;
      }

      if (game.rating < minRating) return false;

      return true;
    });
  }, [allGames, searchQuery, selectedGenres, selectedYear, minRating]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedYear(null);
    setMinRating(0);
  };

  const activeFilterCount = useMemo(() => {
    return [
      !!searchQuery,
      selectedGenres.length > 0,
      !!selectedYear,
      minRating > 0,
    ].filter(Boolean).length;
  }, [searchQuery, selectedGenres, selectedYear, minRating]);

  const hasActiveFilters = activeFilterCount > 0;

  return {
    searchQuery,
    setSearchQuery,
    selectedGenres,
    setSelectedGenres,
    selectedYear,
    setSelectedYear,
    minRating,
    setMinRating,

    genreOptions,
    yearOptions,

    filteredGames,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}