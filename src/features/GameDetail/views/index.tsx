"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { useGame } from "../hooks/useGame";
import { useRouter } from "next/navigation";
import ImageDefault from "@/public/images/default.avif";

interface Props {
  id: string;
}

export default function GameDetailPage({ id }: Props) {
  const router = useRouter();
  const gameId = Number(id);

  console.log("🎮 Game ID from URL:", id);
  console.log("🔢 Converted to number:", gameId);
  console.log("✅ Is valid number:", !isNaN(gameId));

  const { data: game, isLoading, error } = useGame(gameId);

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

  if (error || !game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-center space-y-2">
          <p className="text-destructive text-lg font-semibold">بازی پیدا نشد</p>
          <p className="text-muted-foreground text-sm">
            بازی با شناسه {id} در سیستم موجود نیست
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => router.push("/games")}
            className="gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به لیست بازی‌ها
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-[#fcfcfc14] hover:bg-primary/10"
          >
            بازگشت
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header با دکمه بازگشت */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight">{game.name}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {game.genres.map((g, idx) => (
              <Badge 
                key={idx} 
                variant="outline"
                className="bg-primary/10 text-primary border-primary/30"
              >
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* تصویر اصلی */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#fcfcfc14] bg-[#171717]">
            <Image
              src={game.background_image || ImageDefault}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* اطلاعات جانبی */}
        <div className="space-y-6">
          <Card className="border-[#fcfcfc14] bg-[#171717]">
            <CardContent className="pt-6 space-y-6">
              {/* امتیاز */}
              <div className="flex items-center justify-between pb-6 border-b border-[#fcfcfc14]">
                <span className="text-lg font-medium text-muted-foreground">امتیاز</span>
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold">{game.rating}</span>
                  <span className="text-muted-foreground text-lg">/10</span>
                </div>
              </div>

              {/* تاریخ انتشار */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">تاریخ انتشار</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">
                    {new Date(game.released).toLocaleDateString("fa-IR")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(game.released).getFullYear()}
                  </div>
                </div>
              </div>

              {/* ژانرها */}
              <div className="pt-6 border-t border-[#fcfcfc14]">
                <span className="text-sm text-muted-foreground block mb-3">ژانرها</span>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((g, idx) => (
                    <Badge 
                      key={idx}
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* دکمه‌های عملیات */}
          <div className="space-y-3">
            <Button className="w-full h-12">
              افزودن به علاقه‌مندی‌ها
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-[#fcfcfc14] hover:bg-primary/10"
            >
              اشتراک‌گذاری
            </Button>
          </div>
        </div>
      </div>

      {/* اطلاعات اضافی */}
      <Card className="border-[#fcfcfc14] bg-[#171717]">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">درباره بازی</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div className="flex justify-between py-3 border-b border-[#fcfcfc14]">
              <span className="text-muted-foreground">شناسه</span>
              <span className="font-medium">{game.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#fcfcfc14]">
              <span className="text-muted-foreground">نام بازی</span>
              <span className="font-medium">{game.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#fcfcfc14]">
              <span className="text-muted-foreground">امتیاز</span>
              <span className="font-medium">{game.rating}/10</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#fcfcfc14]">
              <span className="text-muted-foreground">سال انتشار</span>
              <span className="font-medium">{new Date(game.released).getFullYear()}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#fcfcfc14]">
              <span className="text-muted-foreground">تعداد ژانرها</span>
              <span className="font-medium">{game.genres.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}