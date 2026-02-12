"use client";

import GameDetailPage from "@/src/features/GameDetail/views";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>; 
}

export default function Page({ params }: Props) {
  const { slug } = use(params); 
  return <GameDetailPage id={slug} />;
}