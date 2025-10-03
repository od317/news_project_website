// components/home/investigations-section.tsx
import { Investigation } from "@/lib/types";
import Link from "next/link";

interface InvestigationsSectionProps {
  investigations: Investigation[];
  hasMore: boolean;
}

export default function InvestigationsSection({ investigations, hasMore }: InvestigationsSectionProps) {
  if (investigations.length === 0) return null;

  return (
    <section className="bg-accent/30 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
            حصري
          </div>
          <h2 className="text-3xl font-bold tracking-tight">تحقيقات متعمقة</h2>
          <p className="text-muted-foreground mt-2">
            تقارير شاملة وتحليلات معمقة
          </p>
        </div>
        {hasMore && (
          <Link 
            href="/investigations" 
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
          >
            جميع التحقيقات
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investigations.map((investigation) => (
          <Link
            key={investigation.id}
            href={`/investigations/${investigation.id}`}
            className="group block"
          >
            <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  تحقيق
                </span>
              </div>
              
              <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {investigation.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {investigation.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>صفحات: {investigation.total_pages}</span>
                  <span>
                    {new Date(investigation.published_at).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {investigation.first_page_preview}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}