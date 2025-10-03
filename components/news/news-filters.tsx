// components/news/news-filters.tsx
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewsFiltersProps {
  currentCategory?: string;
  currentSearch?: string;
}

const categories = [
  { value: "technology", label: "تكنولوجيا" },
  { value: "politics", label: "سياسة" },
  { value: "sports", label: "رياضة" },
  { value: "health", label: "صحة" },
  { value: "economy", label: "اقتصاد" },
  { value: "entertainment", label: "ترفيه" },
];

export default function NewsFilters({ currentCategory, currentSearch }: NewsFiltersProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(currentSearch || '');

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (currentSearch) params.set('search', currentSearch);
    
    router.push(`/news?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (currentCategory) params.set('category', currentCategory);
    
    router.push(`/news?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/news');
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأخبار..."
            className="w-full px-4 py-2 pr-10 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          بحث
        </button>
      </form>

      {/* Categories & Clear Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !currentCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-foreground hover:bg-accent/80'
            }`}
          >
            الكل
          </button>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentCategory === category.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground hover:bg-accent/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {(currentCategory || currentSearch) && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            مسح الفلاتر
          </button>
        )}
      </div>
    </div>
  );
}