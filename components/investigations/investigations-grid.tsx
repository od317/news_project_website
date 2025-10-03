// components/investigations/investigations-grid.tsx
import { Investigation } from "@/lib/types";
import InvestigationCard from "./investigation-card";
import InvestigationsPagination from "./investigations-pagination";

interface InvestigationsGridProps {
  investigations: Investigation[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function InvestigationsGrid({ 
  investigations, 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrevious 
}: InvestigationsGridProps) {
  if (investigations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            التحقيقات المتاحة
          </h2>
          {investigations.length > 0 && (
            <p className="text-muted-foreground mt-2">
              عرض {investigations.length} من أصل {investigations.length} تحقيق
            </p>
          )}
        </div>
      </div>

      {/* Investigations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investigations.map((investigation) => (
          <InvestigationCard
            key={investigation.id} 
            investigation={investigation} 
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <InvestigationsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
    </div>
  );
}