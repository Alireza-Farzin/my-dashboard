"use client"
import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/src/features/login/hooks/Uselogout";
import { panelDrawerMock } from "@/public/mock/DashboardDrawerMock";
import { LogoutDialog } from "../LogoutDialog/LogoutDialog";

export function Sidebar() {
  const { handleLogout, showLogoutDialog, setShowLogoutDialog } = useLogout();
  return (
    <>
      <aside className="hidden w-64 flex-col border-l border-[#fcfcfc14] bg-card md:flex bg-[#171717]">
        <div className="p-6">
          <h2 className="text-xl font-bold">My Dashboard</h2>
        </div>
        <nav className="flex-1 px-3 py-4">
          {panelDrawerMock.map((item) =>
            item.visible.includes("admin") || item.visible.includes("user") ? (
              <Button
                key={item.link}
                variant="ghost"
                className={cn("mb-1 w-full justify-start gap-3 text-left")}
                asChild
              >
                <Link href={item.link}>
                  <item.icon className="h-5 w-5" />
                  {item.text}
                </Link>
              </Button>
            ) : null
          )}
        </nav>
        <div className=" border-t border-[#fcfcfc14] mb-5 cursor-pointer">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-5 w-5" />
            خروج
          </Button>
        </div>
      </aside>
      <LogoutDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog} onLogout={handleLogout} />
    </>
  );
}
