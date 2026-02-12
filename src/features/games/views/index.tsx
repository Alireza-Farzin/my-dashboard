"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import ImageDefault from "@/public/images/default.avif";
import { AdvancedSelect, SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";

import { useGames } from "../hooks/useGames";
import { useGameFilters } from "../hooks/useGameFilters";

export default function GamesPage() {
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGames();

  const router = useRouter();
  const observerTarget = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(false);

const allGames = useMemo(() => data?.pages.flat() ?? [], [data]);

  const {
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
  } = useGameFilters(allGames);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>در حال بارگذاری بازی‌ها...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">خطا در بارگذاری بازی‌ها</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">بازی‌ها</h1>
          <p className="text-muted-foreground mt-1">
            نمایش {filteredGames.length} بازی از مجموع {allGames.length} بازی
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters((prev) => !prev)}
          className="border-[#fcfcfc14] hover:bg-primary/10 gap-2 whitespace-nowrap cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
          فیلترها
          {hasActiveFilters && (
            <Badge className="ml-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <Card className="border-[#fcfcfc14] bg-[#171717]">
          <CardContent className="pt-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">جستجو</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2  -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="نام بازی، توسعه‌دهنده..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-[#fcfcfc14] bg-background focus-visible:ring-primary/50 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ژانر</label>
                <AdvancedSelect
                  options={genreOptions}
                  value={selectedGenres}
                  onChange={(val) => setSelectedGenres(val as SelectOption[])}
                  placeholder="انتخاب ژانرها..."
                  multiple
                  searchable
                  showSelectAll
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">سال انتشار</label>
                <AdvancedSelect
                  options={yearOptions}
                  value={selectedYear ?? undefined}
                  onChange={(val) => setSelectedYear(val as SelectOption | null)}
                  placeholder="انتخاب سال..."
                  searchable
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block ">
                  حداقل امتیاز: {minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none  cursor-pointer accent-primary"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground gap-1.5"
                >
                  <X className="h-4 w-4" />
                  پاک کردن همه فیلترها
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {filteredGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">هیچ بازی‌ای با فیلترهای انتخاب‌شده یافت نشد</p>
            <p className="text-sm text-muted-foreground/80">
              فیلترها را تغییر دهید یا همه را پاک کنید
            </p>
          </div>
          <Button onClick={clearFilters} variant="outline" className="border-[#fcfcfc14]">
            پاک کردن فیلترها
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => router.push(`/games/${game.id}`)}
              className="cursor-pointer group"
            >
              <Card className="overflow-hidden h-full border-[#fcfcfc14] bg-[#171717] hover:border-[#fcfcfc40] transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={game.background_image || ImageDefault}
                    alt={game.name || "تصویر بازی"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={!!game.background_image?.includes("via.placeholder.com")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-70" />
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant="secondary"
                      className="bg-primary/25 text-primary border-primary/30 backdrop-blur-sm px-2 py-0.5 text-xs font-medium"
                    >
                      {game.rating ? game.rating.toFixed(1) : "—"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {game.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    {new Date(game.released).getFullYear() || "نامشخص"}
                  </p>
                </CardContent>

                <div className="px-4 pb-4 text-xs text-muted-foreground/80 truncate">
                  {game.genres.slice(0, 3).join(" • ") || "بدون ژانر"}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      <div ref={observerTarget} className="flex justify-center py-10">
        {isFetchingNextPage && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>در حال بارگذاری بیشتر...</span>
          </div>
        )}

        {!hasNextPage && allGames.length > 0 && !isFetchingNextPage && (
          <p className="text-muted-foreground text-sm">
            همه بازی‌ها بارگذاری شدند
          </p>
        )}
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="border-[#fcfcfc14] hover:bg-primary/10 hover:border-primary/30 px-8"
          >
            مشاهده بازی‌های بیشتر
          </Button>
        </div>
      )}
    </div>
  );
}