// app/news/page.tsx
import { Metadata } from "next";
import { newsService } from "@/lib/api/core";
import { PaginatedNewsResponse } from "@/lib/types";
import NewsFilters from "@/components/news/news-filters";
import NewsGrid from "@/components/news/news-grid";

export const metadata: Metadata = {
  title: "الأخبار - آخر الأخبار والتقارير",
  description: "تصفح آخر الأخبار والتقارير من مختلف التصنيفات. تحديث مستمر لأهم الأحداث والأخبار العاجلة.",
};

interface NewsPageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category;
  const search = searchParams.search;

  let newsData: PaginatedNewsResponse;

  try {
    if (search) {
      newsData = await newsService.searchNews(search, page, 12);
      console.log(newsData)
    } else {
      newsData = await newsService.getNews({ 
        page, 
        pageSize: 12, 
        category 
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsData = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              الأخبار
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              آخر الأخبار والتقارير من مختلف أنحاء العالم. تحديث مستمر لأهم الأحداث والأخبار العاجلة.
            </p>
          </div>
        </div>
      </section>



      {/* News Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              آخر الأخبار
            </h2>
            {newsData.count > 0 && (
              <p className="text-muted-foreground mt-2">
                عرض {newsData.results.length} من أصل {newsData.count} خبر
              </p>
            )}
          </div>
        </div>

        <NewsGrid 
          articles={newsData.results}
          currentPage={page}
          totalPages={Math.ceil(newsData.count / 12)}
          hasNext={!!newsData.next}
          hasPrevious={!!newsData.previous}
          currentCategory={category}
          currentSearch={search}
        />

        {/* Empty State */}
        {newsData.results.length === 0 && (
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0 0h6m-6 0h6" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لا توجد أخبار
            </h3>
            <p className="text-muted-foreground">
              {search ? `لم نعثر على أخبار تطابق "${search}"` : 'لا توجد أخبار متاحة حالياً'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}