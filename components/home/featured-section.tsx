// components/home/featured-section.tsx
import { NewsArticle} from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface FeaturedSectionProps {
  articles: NewsArticle[];
}

export default function FeaturedSection({ articles }: FeaturedSectionProps) {
  if (articles.length === 0) return null;

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">قصص مميزة</h2>
        <Link 
          href="/news" 
          className="text-primary hover:text-primary/80 font-medium flex items-center gap-2"
        >
          عرض الكل
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        <Link 
          href={`/news/${featuredArticle.id}`}
          className="lg:col-span-2 group"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            {featuredArticle.image ? (
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-muted-foreground">قصة مميزة</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white mb-4">
                مميز
              </div>
              <h3 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-primary-foreground/90 transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-white/80 line-clamp-2 text-sm">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between mt-4 text-sm text-white/70">
                <span>بواسطة {featuredArticle.author_name}</span>
                <span>
                  {new Date(featuredArticle.published_at).toLocaleDateString('ar-EG')}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Secondary Featured Articles */}
        <div className="space-y-6">
          {secondaryArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="group block"
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">أخبار</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{article.author_name}</span>
                    <span>
                      {new Date(article.published_at).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}