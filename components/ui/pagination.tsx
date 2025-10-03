// components/ui/pagination.tsx
'use client';

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  category?: string;
  search?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  category,
  search
}: PaginationProps) {
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    return `/news?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-border pt-8">
      <div className="text-sm text-muted-foreground">
        الصفحة {currentPage} من {totalPages}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {hasPrevious && (
          <Link
            href={buildPageUrl(currentPage - 1)}
            className="inline-flex items-center px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors"
          >
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            السابق
          </Link>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Link
                key={pageNum}
                href={buildPageUrl(pageNum)}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground hover:bg-accent border border-border'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {hasNext && (
          <Link
            href={buildPageUrl(currentPage + 1)}
            className="inline-flex items-center px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent transition-colors"
          >
            التالي
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}