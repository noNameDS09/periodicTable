
import type { PeriodicElement } from '@/types/element';
import type { Filters } from '@/app/page';
import { ElementTile } from './element-tile';

interface PeriodicTableProps {
  elements: PeriodicElement[];
  filters: Filters; 
  isElementFilteredOutProvider: (element: PeriodicElement) => boolean;
}

export function PeriodicTable({ elements, filters, isElementFilteredOutProvider }: PeriodicTableProps) {

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      <div 
        className="grid gap-1 sm:gap-1.5"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(10, minmax(0, auto))', 
        }}
        aria-label="Periodic Table of Elements"
      >
        {elements.map((element) => (
          <ElementTile 
            key={element.atomic_number} 
            element={element} 
            isFilteredOut={isElementFilteredOutProvider(element)}
          />
        ))}
      </div>
       <div className="mt-6 p-4 bg-card rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500"></span>Alkali Metal</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-orange-500"></span>Alkaline Earth</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-400"></span>Transition Metal</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-400"></span>Post-Transition</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-teal-400"></span>Metalloid</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-sky-400"></span>Nonmetal (Poly)</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-400"></span>Nonmetal (Di)</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-purple-400"></span>Lanthanide</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-fuchsia-500"></span>Actinide</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-indigo-400"></span>Noble Gas</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-400"></span>Unknown</div>
        </div>
      </div>
    </div>
  );
}

