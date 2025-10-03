// components/news/news-header.tsx
import { NewsArticle } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface NewsHeaderProps {
  article: NewsArticle;
}

export default function NewsHeader({ article }: NewsHeaderProps) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/news" className="hover:text-foreground transition-colors">الأخبار</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">تفاصيل الخبر</span>
        </nav>

        {/* Article Image */}
        {article.image && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        )}

        {/* Article Meta */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <span>بواسطة {article.author_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-4 h-4 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <span>وقت القراءة: 5 دقائق</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}