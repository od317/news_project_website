// components/investigations/investigation-card.tsx
import { Investigation } from "@/lib/types";
import Link from "next/link";

interface InvestigationCardProps {
  investigation: Investigation;
}

export default function InvestigationCard({ investigation }: InvestigationCardProps) {
  const formattedDate = new Date(investigation.published_at).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link 
      href={`/investigations/${investigation.id}`}
      className="group block"
    >
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Card Header */}
        <div className="p-6 pb-4 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              تحقيق حصري
            </span>
          </div>
          
          <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
            {investigation.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {investigation.description}
          </p>

          {/* Preview Text */}
          <div className="bg-accent/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
              {investigation.first_page_preview}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-6 pt-4 border-t border-border bg-accent/20">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {investigation.total_pages} صفحة
              </span>
            </div>
            <span>{formattedDate}</span>
          </div>

          {/* CTA Button */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
              اقرأ التحقيق
            </span>
            <svg 
              className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}