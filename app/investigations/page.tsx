// app/investigations/page.tsx
import { Metadata } from "next";
import { investigationsService } from "@/lib/api/core";
import { PaginatedInvestigationsResponse } from "@/lib/types";
import InvestigationsHeader from "@/components/investigations/investigations-header";
import InvestigationsGrid from "@/components/investigations/investigations-grid";

export const metadata: Metadata = {
  title: "التحقيقات - تحقيقات حصرية ومتعمقة",
  description: "تصفح تحقيقاتنا الحصرية والمتعمقة في مختلف القضايا. تقارير شاملة تحليلية تغطي كافة الجوانب.",
};

interface InvestigationsPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function InvestigationsPage({ searchParams }: InvestigationsPageProps) {
  const page = parseInt(searchParams.page || '1');

  let investigationsData: PaginatedInvestigationsResponse;

  try {
    investigationsData = await investigationsService.getInvestigations({ 
      page, 
      pageSize: 9 
    });
  } catch (error) {
    console.error('Error fetching investigations:', error);
    investigationsData = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Investigations Grid */}
      <section className="container mx-auto px-4 py-8">
        <InvestigationsGrid 
          investigations={investigationsData.results}
          currentPage={page}
          totalPages={Math.ceil(investigationsData.count / 9)}
          hasNext={!!investigationsData.next}
          hasPrevious={!!investigationsData.previous}
        />

        {/* Empty State */}
        {investigationsData.results.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-muted-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لا توجد تحقيقات
            </h3>
            <p className="text-muted-foreground">
              لا توجد تحقيقات متاحة حالياً
            </p>
          </div>
        )}
      </section>
    </div>
  );
}