"use client";

import { useMemo, useState } from "react";
import { SelectOption } from "@/src/components/AdvancedSelect/AdvancedSelect";
import { genderOptions, User } from "../interface";


export function useUserFilters(users: User[] | undefined) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGender, setSelectedGender] = useState<SelectOption | null>(null);
    const [minAge, setMinAge] = useState<number>(0);
    const [maxAge, setMaxAge] = useState<number>(100);

    const filteredUsers = useMemo(() => {
        if (!users || users.length === 0) return [];

        return users.filter((user) => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                if (
                    !fullName.includes(query) &&
                    !user.username.toLowerCase().includes(query) &&
                    !user.email.toLowerCase().includes(query)
                ) {
                    return false;
                }
            }

            if (selectedGender && user.gender !== selectedGender.value) {
                return false;
            }

            if (user.age < minAge || user.age > maxAge) {
                return false;
            }

            return true;
        });
    }, [users, searchQuery, selectedGender, minAge, maxAge]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedGender(null);
        setMinAge(0);
        setMaxAge(100);
    };

    const hasActiveFilters =
        searchQuery !== "" ||
        selectedGender !== null ||
        minAge > 0 ||
        maxAge < 100;

    const activeFilterCount = [
        searchQuery !== "",
        selectedGender !== null,
        minAge > 0,
        maxAge < 100,
    ].filter(Boolean).length;

    return {
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
    };
}