"use client";

import { Home, Users, ShoppingBag, Gamepad2, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "داشبورد", icon: Home },
  { href: "/dashboard/users", label: "کاربران", icon: Users },
  { href: "/dashboard/products", label: "محصولات", icon: ShoppingBag },
  { href: "/games", label: "بازی‌ها", icon: Gamepad2 },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-l bg-card md:flex ">
      <div className="p-6">
        <h2 className="text-xl font-bold">My Dashboard</h2>
      </div>
      <nav className="flex-1 px-3 py-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "mb-1 w-full justify-start gap-3 text-left",
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
          <LogOut className="h-5 w-5" />
          خروج
        </Button>
      </div>
    </aside>
  );
}