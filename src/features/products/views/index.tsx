"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useProducts } from "../hooks/useProducts";
import { useProductsFilters } from "../hooks/useProductsFilters";
import { AdvancedSelect, SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";

export default function ProductsPage() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts();
  const observerTarget = useRef<HTMLDivElement>(null);
  const [showFilters, setShowFilters] = useState(false);

  const allProducts = data?.pages.flatMap(p => p.products) || [];

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    categoryOptions,
    brandOptions,
    filteredProducts,
    clearFilters,
    hasActiveFilters,
  } = useProductsFilters(allProducts);

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
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">خطا در دریافت محصولات</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">محصولات</h1>
          <p className="text-muted-foreground mt-1">
            نمایش {filteredProducts.length} از {allProducts.length} محصول
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-[#fcfcfc14] hover:bg-primary/10 gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          فیلترها
          {hasActiveFilters && (
            <Badge className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {[searchQuery, selectedCategory, selectedBrand, minPrice > 0, maxPrice < 10000, minRating > 0].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* فیلترها */}
      {showFilters && (
        <Card className="border-[#fcfcfc14] bg-[#171717]">
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* جستجو */}
              <div className="space-y-2">
                <label className="text-sm font-medium">جستجو</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="نام محصول..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-[#fcfcfc14] bg-background h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">دسته‌بندی</label>
                <AdvancedSelect
                  options={categoryOptions}
                  value={selectedCategory || undefined}
                  onChange={(value) => setSelectedCategory(value as SelectOption)}
                  placeholder="انتخاب دسته‌بندی..."
                  searchable
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">برند</label>
                <AdvancedSelect
                  options={brandOptions}
                  value={selectedBrand || undefined}
                  onChange={(value) => setSelectedBrand(value as SelectOption)}
                  placeholder="انتخاب برند..."
                  searchable
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  محدوده قیمت: ${minPrice} - ${maxPrice}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="10"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 10))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 10))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  حداقل امتیاز: {minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  پاک کردن فیلترها
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <p className="text-muted-foreground">محصولی با این فیلترها پیدا نشد</p>
          <Button onClick={clearFilters} variant="outline" className="border-[#fcfcfc14]">
            پاک کردن فیلترها
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden h-full border-[#fcfcfc14] bg-[#171717] hover:border-[#fcfcfc24] transition-all duration-300 group">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                    {product.rating.toFixed(1)} ⭐
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </CardContent>
              <CardFooter className="pt-0 text-sm text-muted-foreground">
                {product.category} • {product.brand}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div ref={observerTarget} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>در حال بارگذاری بیشتر...</p>
          </div>
        )}
        {!hasNextPage && allProducts.length > 0 && (
          <p className="text-muted-foreground text-sm">همه محصولات نمایش داده شد</p>
        )}
      </div>
    </div>
  );
}