import type { PeriodicElement } from '@/types/element';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capitalize } from '@/lib/utils'; // Will create this utility

interface ElementInfoCardProps {
  element: PeriodicElement;
}

export function ElementInfoCard({ element }: ElementInfoCardProps) {
  const getCategoryColorClass = (category: string): string => {
    const categoryFormatted = category.toLowerCase().replace(/\s+/g, '-');
    if (category.includes("alkali")) return "bg-red-400 dark:bg-red-700";
    if (category.includes("alkaline")) return "bg-orange-400 dark:bg-orange-700";
    if (category.includes("lanthanide")) return "bg-purple-400 dark:bg-purple-700";
    if (category.includes("actinide")) return "bg-indigo-400 dark:bg-indigo-700";
    if (category.includes("transition")) return "bg-blue-400 dark:bg-blue-700";
    if (category.includes("post-transition")) return "bg-sky-400 dark:bg-sky-700";
    if (category.includes("metalloid")) return "bg-teal-400 dark:bg-teal-700";
    if (category.includes("nonmetal")) return "bg-green-400 dark:bg-green-700";
    if (category.includes("noble gas")) return "bg-pink-400 dark:bg-pink-700";
    return "bg-gray-400 dark:bg-gray-600"; // Unknown
  };
  
  return (
    <Card className="w-80 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold">{element.symbol}</CardTitle>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Atomic Number</div>
            <div className="text-2xl font-semibold">{element.atomic_number}</div>
          </div>
        </div>
        <CardDescription className="text-lg">{element.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Atomic Mass:</span>
          <span>{element.atomic_mass.toFixed(4)} u</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Category:</span>
          <Badge variant="secondary" className={`${getCategoryColorClass(element.category)} text-white dark:text-gray-100`}>
            {capitalize(element.category)}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span>Phase:</span>
          <span>{element.phase}</span>
        </div>
        {element.electronegativity_pauling !== null && (
          <div className="flex justify-between">
            <span>Electronegativity:</span>
            <span>{element.electronegativity_pauling}</span>
          </div>
        )}
        {element.density !== null && (
          <div className="flex justify-between">
            <span>Density:</span>
            <span>{element.density} g/cm³</span>
          </div>
        )}
        <p className="pt-2 text-xs text-muted-foreground leading-relaxed">
          {element.summary.length > 150 ? element.summary.substring(0, 150) + "..." : element.summary}
        </p>
      </CardContent>
    </Card>
  );
}
