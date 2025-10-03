// components/home/news-section.tsx
import { NewsArticle } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface NewsSectionProps {
  articles: NewsArticle[];
  hasMore: boolean;
}

export default function NewsSection({ articles, hasMore }: NewsSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">آخر الأخبار</h2>
        {hasMore && (
          <Link 
            href="/news" 
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
          >
            عرض جميع الأخبار
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="group">
            <Link href={`/news/${article.id}`} className="block">
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground">صورة الخبر</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{article.author_name}</span>
                    <span>
                      {new Date(article.published_at).toLocaleDateString('ar-EG', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}