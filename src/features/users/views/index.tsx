"use client";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "../hooks/useUsers";

export const metadata: Metadata = {
  title: "کاربران",
};

export default function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers(); 

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (isError) {
    return <div>خطا: {error instanceof Error ? error.message : 'مشکلی پیش آمده'}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">کاربران</h1>
        <p className="text-muted-foreground mt-1">مدیریت کاربران سیستم</p>
      </div>
      <div className="rounded-lg border border-[#fcfcfc14] bg-[#171717]">
        <Table className="table-auto border-collapse" dir="rtl">
          <TableHeader>
            <TableRow className="border-[#fcfcfc14] hover:bg-transparent">
              <TableHead className="w-12"> </TableHead>
              <TableHead className="text-right">نام</TableHead>
              <TableHead className="text-right">نام کاربری</TableHead>
              <TableHead className="text-right">ایمیل</TableHead>
              <TableHead className="text-right">جنسیت</TableHead>
              <TableHead className="text-right">سن</TableHead>
              <TableHead className="text-center">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow
                key={user.id}
                className="border-[#fcfcfc14] hover:bg-primary/5 transition-colors"
              >
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image} alt={user.firstName} />
                    <AvatarFallback className="bg-primary/10 text-sm">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-muted-foreground">{user.username}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>{user.gender === "male" ? "آقا" : "خانم"}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    فعال
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
