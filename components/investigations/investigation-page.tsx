// components/investigations/investigation-page.tsx
import { InvestigationPage as InvestigationPageType } from "@/lib/types";
import Image from "next/image";

interface InvestigationPageProps {
  page: InvestigationPageType;
  pageNumber: number;
  totalPages: number;
}

export default function InvestigationPage({ page, pageNumber, totalPages }: InvestigationPageProps) {
  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Page Header */}
      <div className="p-6 border-b border-border bg-accent/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              {pageNumber}
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {page.title}
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">
            صفحة {pageNumber} من {totalPages}
          </span>
        </div>
        
        {page.source && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a 
              href={page.source} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors truncate"
            >
              {page.source}
            </a>
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className="p-6">
        {/* Image if exists */}
        {page.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={page.image}
              alt={page.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground">
          <div 
            className="leading-8 text-foreground/90 text-lg space-y-4"
            style={{ whiteSpace: 'pre-line' }}
          >
            {page.content}
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div className="px-6 py-4 border-t border-border bg-accent/10 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>
            آخر تحديث: {new Date(page.updated_at).toLocaleDateString('ar-EG')}
          </span>
          <span>
            تم الإنشاء: {new Date(page.created_at).toLocaleDateString('ar-EG')}
          </span>
        </div>
      </div>
    </article>
  );
}