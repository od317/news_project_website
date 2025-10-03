// components/news/news-grid.tsx
import { NewsArticle } from "@/lib/types";
import NewsCard from "./news-card";
import Pagination from "../ui/pagination";

interface NewsGridProps {
  articles: NewsArticle[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  currentCategory?: string;
  currentSearch?: string;
}

export default function NewsGrid({ 
  articles, 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrevious,
  currentCategory,
  currentSearch 
}: NewsGridProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          category={currentCategory}
          search={currentSearch}
        />
      )}
    </div>
  );
}