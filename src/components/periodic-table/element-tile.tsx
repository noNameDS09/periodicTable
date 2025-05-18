
"use client";

import type { PeriodicElement } from '@/types/element';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ElementInfoCard } from "./element-info-card";
import { cn, capitalize } from '@/lib/utils';

interface ElementTileProps {
  element: PeriodicElement;
  isFilteredOut?: boolean;
}

const categoryColorStyles: Record<string, { bg: string; text: string; border: string }> = {
  "alkali metal": { bg: "bg-red-500", text: "text-white", border: "border-red-700" },
  "alkaline earth metal": { bg: "bg-orange-500", text: "text-white", border: "border-orange-700" },
  "lanthanide": { bg: "bg-purple-400", text: "text-white", border: "border-purple-600" },
  "actinide": { bg: "bg-fuchsia-500", text: "text-white", border: "border-fuchsia-700" },
  "transition metal": { bg: "bg-yellow-400", text: "text-gray-800", border: "border-yellow-600" },
  "post-transition metal": { bg: "bg-green-400", text: "text-white", border: "border-green-600" },
  "metalloid": { bg: "bg-teal-400", text: "text-white", border: "border-teal-600" },
  "polyatomic nonmetal": { bg: "bg-sky-400", text: "text-white", border: "border-sky-600" },
  "diatomic nonmetal": { bg: "bg-blue-400", text: "text-white", border: "border-blue-600" },
  "noble gas": { bg: "bg-indigo-400", text: "text-white", border: "border-indigo-600" },
  "unknown, probably transition metal": { bg: "bg-gray-400", text: "text-white", border: "border-gray-600" },
  "unknown, probably post-transition metal": { bg: "bg-gray-400", text: "text-white", border: "border-gray-600" },
  "unknown, probably metalloid": { bg: "bg-gray-400", text: "text-white", border: "border-gray-600" },
  "unknown, predicted to be noble gas": { bg: "bg-gray-400", text: "text-white", border: "border-gray-600" },
  "synthetic radioisotope": { bg: "bg-pink-400", text: "text-white", border: "border-pink-600" },
  "unknown": { bg: "bg-gray-300", text: "text-gray-700", border: "border-gray-500" } // Default fallback
};

const getCategoryStyle = (category: string): { bg: string; text: string; border: string } => {
  return categoryColorStyles[category.toLowerCase().trim()] || categoryColorStyles["unknown"];
};

export function ElementTile({ element, isFilteredOut = false }: ElementTileProps) {
  const style = getCategoryStyle(element.category);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          data-cursor-type="element-tile" // Added data attribute
          className={cn(
            "group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border p-1 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg hover:z-10",
            style.bg,
            style.text,
            style.border,
            isFilteredOut ? "opacity-30 hover:opacity-100" : "opacity-100"
          )}
          style={{
            gridColumnStart: element.xpos,
            gridRowStart: element.ypos,
          }}
          role="button"
          tabIndex={0}
          aria-label={`Element: ${element.name}, Symbol: ${element.symbol}, Atomic Number: ${element.atomic_number}`}
        >
          <div className="absolute top-1 left-1 text-xs font-medium">
            {element.atomic_number}
          </div>
          <div className="text-xl sm:text-2xl font-bold">{element.symbol}</div>
          <div className="hidden sm:block text-[0.6rem] leading-tight text-center truncate w-full px-0.5 group-hover:text-sm">
            {element.name}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-0 shadow-none" side="bottom" align="center">
        <ElementInfoCard element={element} />
      </PopoverContent>
    </Popover>
  );
}
