"use client"
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImageDefault from "@/public/images/default.avif";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGames } from "../hooks/useGames";

export default function GamesPage() {
    const { 
        data, 
        isLoading, 
        error, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useGames();

    const observerTarget = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
                    <p>در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-destructive">خطا در دریافت بازی‌ها</p>
            </div>
        );
    }

    const games = data?.pages.flat() || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">بازی‌ها</h1>
                <p className="text-muted-foreground mt-1">
                    جدیدترین و محبوب‌ترین بازی‌ها ({games.length} بازی)
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => (
                    <div key={game.id} onClick={() => router.push(`/games/${game.id}`)}>
                        <Card className="overflow-hidden h-full border-[#fcfcfc14] bg-[#171717] hover:border-[#fcfcfc24] transition-all duration-300 group">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={game.background_image || ImageDefault}
                                    alt={game.name || "بازی بدون نام"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-2 right-2">
                                    <Badge 
                                        variant="secondary"
                                        className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm"
                                    >
                                        {game.rating?.toFixed(1) || "—"}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="pt-4">
                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {game.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {new Date(game.released).getFullYear()}
                                </p>
                            </CardContent>
                            <CardFooter className="pt-0 text-sm text-muted-foreground">
                                {game.genres.slice(0, 2).join(" • ") || "—"}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className="flex justify-center py-8">
                {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p>در حال بارگذاری بیشتر...</p>
                    </div>
                )}
                {!hasNextPage && games.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                        همه بازی‌ها نمایش داده شد
                    </p>
                )}
            </div>

            {/* دکمه Manual Load (اختیاری) */}
            {hasNextPage && !isFetchingNextPage && (
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => fetchNextPage()}
                        variant="outline"
                        className="border-[#fcfcfc14] hover:bg-primary/10 hover:border-primary/30"
                    >
                        مشاهده بیشتر
                    </Button>
                </div>
            )}
        </div>
    );
}