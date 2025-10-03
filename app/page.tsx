// app/page.tsx
import { Metadata } from "next";
import HeroSection from "@/components/home/hero-section";
import NewsSection from "@/components/home/news-section";
import InvestigationsSection from "@/components/home/investigations-section";
import FeaturedSection from "@/components/home/featured-section";
import { PaginatedNewsResponse, PaginatedInvestigationsResponse } from "@/lib/types";
import { investigationsService, newsService } from "@/lib/api/core";

// Create proper fallback responses
const emptyNewsResponse: PaginatedNewsResponse = {
  count: 0,
  next: null,
  previous: null,
  results: []
};

const emptyInvestigationsResponse: PaginatedInvestigationsResponse = {
  count: 0,
  next: null,
  previous: null,
  results: []
};

export const metadata: Metadata = {
  title: "Latest News & In-Depth Investigations",
  description: "Stay informed with breaking news, exclusive investigations, and comprehensive reports from trusted journalists worldwide.",
};

export default async function HomePage() {
  // Fetch data in parallel for better performance
  const [newsResult, investigationsResult] = await Promise.allSettled([
    newsService.getNews({ page: 1, pageSize: 6 }),
    investigationsService.getInvestigations({ page: 1, pageSize: 3 }),
  ]);

  // Extract values from Promise.allSettled results with safe fallbacks
  const newsData = newsResult.status === 'fulfilled' ? newsResult.value : emptyNewsResponse;
  const investigationsData = investigationsResult.status === 'fulfilled' ? investigationsResult.value : emptyInvestigationsResponse;

  console.log('News Data:', newsData);
  console.log('Investigations Data:', investigationsData);

  // Safe access to results with fallbacks
  const newsArticles = newsData?.results || [];
  const investigationItems = investigationsData?.results || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured News Section */}
      {newsArticles.length > 0 && (
        <FeaturedSection articles={newsArticles.slice(0, 3)} />
      )}

      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Latest News Section */}
        <NewsSection 
          articles={newsArticles} 
          hasMore={!!newsData?.next}
        />

        {/* Investigations Section */}
        <InvestigationsSection 
          investigations={investigationItems}
          hasMore={!!investigationsData?.next}
        />
      </div>
    </div>
  );
}