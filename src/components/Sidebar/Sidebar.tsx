"use client";
import { useState } from "react";
import { LogOut, X, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/src/features/login/hooks/Uselogout";
import { panelDrawerMock } from "@/public/mock/DashboardDrawerMock";
import { LogoutDialog } from "../LogoutDialog/LogoutDialog";

export function Sidebar() {
  const { handleLogout, showLogoutDialog, setShowLogoutDialog } = useLogout();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "flex flex-col border-l border-[#fcfcfc14] bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          "md:flex bg-[#171717]"
        )}
      >
        <Link href='/' className="p-4 flex justify-between items-center">
          {!collapsed && <h2 className="text-xl font-bold">My Dashboard</h2>}
          <Button
            variant="ghost"
            className="p-1 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <Menu /> : <X />}
          </Button>
        </Link>

        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {panelDrawerMock.map((item) =>
            item.visible.includes("admin") || item.visible.includes("user") ? (
              <Button
                key={item.link}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-left",
                  collapsed && "justify-center"
                )}
                asChild
              >
                <Link href={item.link}>
                  <item.icon className="h-5 w-5" />
                  {!collapsed && item.text}
                </Link>
              </Button>
            ) : null
          )}
        </nav>

        <div className="border-t border-[#fcfcfc14] mb-5 cursor-pointer">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
              collapsed && "justify-center"
            )}
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "خروج"}
          </Button>
        </div>
      </aside>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onLogout={handleLogout}
      />
    </>
  );
}
