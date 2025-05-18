
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { elementCategories, elementPhases, elementGroups, elementPeriods } from '@/data/elements';
import { capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Filters, FilterType } from "@/app/page";

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filterType: FilterType, value: string | number) => void;
  onResetFilters: () => void;
}

const ALL_ITEMS_SENTINEL_VALUE = "__ALL_ITEMS__";

export function FilterPanel({ filters, onFilterChange, onResetFilters }: FilterPanelProps) {
  
  const handleInputChange = (filterType: FilterType, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange(filterType, value === "" ? "" : parseFloat(value)); // Keep empty string to clear, otherwise parse
  };

  const handleSelectChange = (filterType: FilterType, value: string) => {
    onFilterChange(filterType, value === ALL_ITEMS_SENTINEL_VALUE ? "" : value);
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filter Elements</h2>
        <Button onClick={onResetFilters} variant="outline" size="sm">
          <X className="mr-2 h-4 w-4" /> Reset All Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        <div>
          <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
          <Select
            value={filters.category || ""}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger id="category-filter" className="w-full mt-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Categories</SelectItem>
              {elementCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {capitalize(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="phase-filter" className="text-sm font-medium">Standard State (Phase)</Label>
          <Select
            value={filters.phase || ""}
            onValueChange={(value) => handleSelectChange('phase', value)}
          >
            <SelectTrigger id="phase-filter" className="w-full mt-1">
              <SelectValue placeholder="All Phases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Phases</SelectItem>
              {elementPhases.map((phase) => (
                <SelectItem key={phase} value={phase}>
                  {capitalize(phase)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="group-filter" className="text-sm font-medium">Group</Label>
          <Select
            value={filters.group?.toString() || ""}
            onValueChange={(value) => handleSelectChange('group', value)}
          >
            <SelectTrigger id="group-filter" className="w-full mt-1">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Groups</SelectItem>
              {elementGroups.map((group) => (
                <SelectItem key={group} value={group.toString()}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="period-filter" className="text-sm font-medium">Period</Label>
          <Select
            value={filters.period?.toString() || ""}
            onValueChange={(value) => handleSelectChange('period', value)}
          >
            <SelectTrigger id="period-filter" className="w-full mt-1">
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Periods</SelectItem>
              {elementPeriods.map((period) => (
                <SelectItem key={period} value={period.toString()}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Label className="text-sm font-medium">Atomic Number</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="atomicNumberMin-filter"
              type="number"
              placeholder="Min"
              value={filters.atomicNumberMin?.toString() ?? ""}
              onChange={(e) => handleInputChange('atomicNumberMin', e)}
              min="1"
              max="118"
            />
            <Input
              id="atomicNumberMax-filter"
              type="number"
              placeholder="Max"
              value={filters.atomicNumberMax?.toString() ?? ""}
              onChange={(e) => handleInputChange('atomicNumberMax', e)}
              min="1"
              max="118"
            />
          </div>
        </div>
        
         <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Label className="text-sm font-medium">Density (g/cm³)</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="densityMin-filter"
              type="number"
              placeholder="Min"
              step="0.01"
              value={filters.densityMin?.toString() ?? ""}
              onChange={(e) => handleInputChange('densityMin', e)}
            />
            <Input
              id="densityMax-filter"
              type="number"
              placeholder="Max"
              step="0.01"
              value={filters.densityMax?.toString() ?? ""}
              onChange={(e) => handleInputChange('densityMax', e)}
            />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Label className="text-sm font-medium">Electronegativity (Pauling)</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="electronegativityMin-filter"
              type="number"
              placeholder="Min"
              step="0.01"
              value={filters.electronegativityMin?.toString() ?? ""}
              onChange={(e) => handleInputChange('electronegativityMin', e)}
            />
            <Input
              id="electronegativityMax-filter"
              type="number"
              placeholder="Max"
              step="0.01"
              value={filters.electronegativityMax?.toString() ?? ""}
              onChange={(e) => handleInputChange('electronegativityMax', e)}
            />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Label className="text-sm font-medium">Melting Point (K)</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="meltingPointMin-filter"
              type="number"
              placeholder="Min"
              step="0.1"
              value={filters.meltingPointMin?.toString() ?? ""}
              onChange={(e) => handleInputChange('meltingPointMin', e)}
            />
            <Input
              id="meltingPointMax-filter"
              type="number"
              placeholder="Max"
              step="0.1"
              value={filters.meltingPointMax?.toString() ?? ""}
              onChange={(e) => handleInputChange('meltingPointMax', e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
