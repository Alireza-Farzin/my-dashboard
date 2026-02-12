import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";  

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-[#fcfcfc14] bg-[#171717] px-6">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="جستجو..."
            className="w-full pl-8 border-[#fcfcfc14] bg-background focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9 rounded-full bg-primary/10 border border-[#fcfcfc14] flex items-center justify-center">
          <AvatarFallback className="text-sm font-medium">F.A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}