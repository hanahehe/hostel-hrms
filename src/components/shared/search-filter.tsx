"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  children?: React.ReactNode;
}

export function SearchFilterBar({
  search,
  onSearchChange,
  placeholder = "Search...",
  onFilterClick,
  children,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        {onFilterClick ? (
          <Button variant="outline" size="sm" onClick={onFilterClick}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        ) : null}
      </div>
    </div>
  );
}
