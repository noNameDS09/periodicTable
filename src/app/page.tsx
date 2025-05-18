"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { PeriodicTable } from "@/components/periodic-table/periodic-table";
import { FilterPanel } from "@/components/periodic-table/filter-panel";
import { AISuggestionTool } from "@/components/ai/ai-suggestion-tool";
import { elements as allElementsData } from "@/data/elements";
import type { PeriodicElement } from "@/types/element";

export interface Filters {
  category?: string;
  phase?: string;
  atomicNumberMin?: number;
  atomicNumberMax?: number;
  group?: number;
  period?: number;
  densityMin?: number;
  densityMax?: number;
  electronegativityMin?: number;
  electronegativityMax?: number;
  meltingPointMin?: number;
  meltingPointMax?: number;
}

export type FilterType = keyof Filters;

export default function ElementExplorerPage() {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = (
    filterType: FilterType,
    value: string | number
  ) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (value === "" || value === undefined || value === null) {
        // @ts-ignore
        delete newFilters[filterType];
      } else {
        // @ts-ignore
        newFilters[filterType] =
          typeof value === "string" &&
          !isNaN(parseFloat(value)) &&
          (filterType.endsWith("Min") ||
            filterType.endsWith("Max") ||
            filterType === "group" ||
            filterType === "period")
            ? parseFloat(value)
            : value;
      }
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const elements = useMemo(() => allElementsData, []);

  const filteredElements = useMemo(() => {
    return elements.filter((el) => {
      let match = true;
      if (filters.category && el.category !== filters.category) match = false;
      if (filters.phase && el.phase !== filters.phase) match = false;

      if (
        filters.atomicNumberMin !== undefined &&
        el.atomic_number < filters.atomicNumberMin
      )
        match = false;
      if (
        filters.atomicNumberMax !== undefined &&
        el.atomic_number > filters.atomicNumberMax
      )
        match = false;

      if (filters.group !== undefined && el.group !== filters.group)
        match = false;
      if (filters.period !== undefined && el.period !== filters.period)
        match = false;

      if (filters.densityMin !== undefined) {
        if (el.density === null || el.density < filters.densityMin)
          match = false;
      }
      if (filters.densityMax !== undefined) {
        if (el.density === null || el.density > filters.densityMax)
          match = false;
      }

      if (filters.electronegativityMin !== undefined) {
        if (
          el.electronegativity_pauling === null ||
          el.electronegativity_pauling < filters.electronegativityMin
        )
          match = false;
      }
      if (filters.electronegativityMax !== undefined) {
        if (
          el.electronegativity_pauling === null ||
          el.electronegativity_pauling > filters.electronegativityMax
        )
          match = false;
      }

      if (filters.meltingPointMin !== undefined) {
        if (el.melt === null || el.melt < filters.meltingPointMin)
          match = false;
      }
      if (filters.meltingPointMax !== undefined) {
        if (el.melt === null || el.melt > filters.meltingPointMax)
          match = false;
      }

      return match;
    });
  }, [elements, filters]);

  const isElementFilteredOut = (element: PeriodicElement): boolean => {
    let isOut = false;
    if (filters.category && element.category !== filters.category) isOut = true;
    if (filters.phase && element.phase !== filters.phase) isOut = true;

    if (
      filters.atomicNumberMin !== undefined &&
      element.atomic_number < filters.atomicNumberMin
    )
      isOut = true;
    if (
      filters.atomicNumberMax !== undefined &&
      element.atomic_number > filters.atomicNumberMax
    )
      isOut = true;

    if (filters.group !== undefined && element.group !== filters.group)
      isOut = true;
    if (filters.period !== undefined && element.period !== filters.period)
      isOut = true;

    if (filters.densityMin !== undefined) {
      if (element.density === null || element.density < filters.densityMin)
        isOut = true;
    }
    if (filters.densityMax !== undefined) {
      if (element.density === null || element.density > filters.densityMax)
        isOut = true;
    }

    if (filters.electronegativityMin !== undefined) {
      if (
        element.electronegativity_pauling === null ||
        element.electronegativity_pauling < filters.electronegativityMin
      )
        isOut = true;
    }
    if (filters.electronegativityMax !== undefined) {
      if (
        element.electronegativity_pauling === null ||
        element.electronegativity_pauling > filters.electronegativityMax
      )
        isOut = true;
    }

    if (filters.meltingPointMin !== undefined) {
      if (element.melt === null || element.melt < filters.meltingPointMin)
        isOut = true;
    }
    if (filters.meltingPointMax !== undefined) {
      if (element.melt === null || element.melt > filters.meltingPointMax)
        isOut = true;
    }

    let matchesAllActiveFilters = true;
    if (filters.category && element.category !== filters.category)
      matchesAllActiveFilters = false;
    if (filters.phase && element.phase !== filters.phase)
      matchesAllActiveFilters = false;

    if (
      filters.atomicNumberMin !== undefined &&
      element.atomic_number < filters.atomicNumberMin
    )
      matchesAllActiveFilters = false;
    if (
      filters.atomicNumberMax !== undefined &&
      element.atomic_number > filters.atomicNumberMax
    )
      matchesAllActiveFilters = false;

    if (filters.group !== undefined && element.group !== filters.group)
      matchesAllActiveFilters = false;
    if (filters.period !== undefined && element.period !== filters.period)
      matchesAllActiveFilters = false;

    if (
      filters.densityMin !== undefined &&
      (element.density === null || element.density < filters.densityMin)
    )
      matchesAllActiveFilters = false;
    if (
      filters.densityMax !== undefined &&
      (element.density === null || element.density > filters.densityMax)
    )
      matchesAllActiveFilters = false;

    if (
      filters.electronegativityMin !== undefined &&
      (element.electronegativity_pauling === null ||
        element.electronegativity_pauling < filters.electronegativityMin)
    )
      matchesAllActiveFilters = false;
    if (
      filters.electronegativityMax !== undefined &&
      (element.electronegativity_pauling === null ||
        element.electronegativity_pauling > filters.electronegativityMax)
    )
      matchesAllActiveFilters = false;

    if (
      filters.meltingPointMin !== undefined &&
      (element.melt === null || element.melt < filters.meltingPointMin)
    )
      matchesAllActiveFilters = false;
    if (
      filters.meltingPointMax !== undefined &&
      (element.melt === null || element.melt > filters.meltingPointMax)
    )
      matchesAllActiveFilters = false;

    // If there's at least one filter active, and the element doesn't match all active filters, it's filtered out.
    const hasActiveFilters = Object.values(filters).some(
      (val) => val !== undefined && val !== ""
    );
    return hasActiveFilters && !matchesAllActiveFilters;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section
            id="filters"
            aria-labelledby="filters-heading"
            className="px-2 md:px-16 lg:px-32"
          >
            <h2 id="filters-heading" className="sr-only">
              Element Filters
            </h2>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </section>

          <section id="periodic-table" aria-labelledby="periodic-table-heading">
            <h2 id="periodic-table-heading" className="sr-only">
              Interactive Periodic Table
            </h2>
            <PeriodicTable
              elements={elements}
              filters={filters}
              isElementFilteredOutProvider={isElementFilteredOut}
            />
          </section>

          <section
            id="ai-suggester"
            aria-labelledby="ai-suggester-heading"
            className="pt-8"
          >
            <h2 id="ai-suggester-heading" className="sr-only">
              AI Element Suggester
            </h2>
            <AISuggestionTool />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Element Explorer - Powered by Next.js and AI.
      </footer>
    </div>
  );
}
