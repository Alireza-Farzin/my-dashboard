"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { AdvancedSelect, SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";
import { useUsers } from "../hooks/useUsers";
import { useUserFilters } from "../hooks/useUserFilters";

export default function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();
  const {
    searchQuery,
    setSearchQuery,
    selectedGender,
    setSelectedGender,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    filteredUsers,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
    genderOptions,
  } = useUserFilters(users);

  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        در حال بارگذاری...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-destructive">
        خطا: {error instanceof Error ? error.message : "مشکلی پیش آمده"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">کاربران</h1>
          <p className="text-muted-foreground mt-1">
            نمایش {filteredUsers.length} از {users?.length || 0} کاربر
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-[#fcfcfc14] hover:bg-primary/10 gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
          فیلترها
          {hasActiveFilters && (
            <Badge className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <Card className="border-[#fcfcfc14] bg-[#171717]">
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 items-center md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">جستجو</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="نام، نام کاربری یا ایمیل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border-[#fcfcfc14] bg-background h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">جنسیت</label>
                <AdvancedSelect
                  options={genderOptions}
                  value={selectedGender ?? undefined}
                  onChange={(val) => setSelectedGender(val as SelectOption | null)}
                  placeholder="انتخاب جنسیت..."
                />
              </div>

              <div className="space-y-2 mt-2.5">
                <label className="text-sm font-medium">
                  محدوده سنی: {minAge} – {maxAge} سال
                </label>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minAge}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMinAge(Math.min(val, maxAge - 1));
                      }}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-xs text-center mt-1 text-muted-foreground">از {minAge}</div>
                  </div>

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxAge}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMaxAge(Math.max(val, minAge + 1));
                      }}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-xs text-center mt-1 text-muted-foreground">تا {maxAge}</div>
                  </div>
                </div>
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

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <p className="text-muted-foreground">کاربری با این فیلترها پیدا نشد</p>
          <Button onClick={clearFilters} variant="outline" className="border-[#fcfcfc14]">
            پاک کردن فیلترها
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-[#fcfcfc14] bg-[#171717] overflow-hidden">
          <Table dir="rtl">
            <TableHeader>
              <TableRow className="border-[#fcfcfc14] hover:bg-transparent">
                <TableHead className="w-12 text-center"> </TableHead>
                <TableHead className="text-right">نام</TableHead>
                <TableHead className="text-right">نام کاربری</TableHead>
                <TableHead className="text-right">ایمیل</TableHead>
                <TableHead className="text-right">جنسیت</TableHead>
                <TableHead className="text-right">سن</TableHead>
                <TableHead className="text-center">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-[#fcfcfc14] hover:bg-primary/5 transition-colors"
                >
                  <TableCell className="text-center">
                    <Avatar className="h-9 w-9 mx-auto">
                      <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="bg-primary/10 text-sm">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
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
      )}
    </div>
  );
}