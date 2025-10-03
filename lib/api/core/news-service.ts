// lib/api/news-service.ts
import { apiFetch, buildPaginatedUrl, FetchOptions } from "./core";
import { NewsArticle, PaginatedNewsResponse, NewsParams } from "@/lib/types";

const NEWS_BASE_ENDPOINT = "/news";
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_REVALIDATE_TIME = 3600; // 1 hour

// Type guards for runtime type checking
function isNewsArticle(data: unknown): data is NewsArticle {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "title" in data &&
    "body" in data &&
    "author_name" in data &&
    "published_at" in data &&
    "created_at" in data
  );
}

function isNewsArticleArray(data: unknown): data is NewsArticle[] {
  console.log(data);
  return Array.isArray(data);
}

function isPaginatedNewsResponse(data: unknown): data is PaginatedNewsResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "count" in data &&
    "next" in data &&
    "previous" in data &&
    "results" in data &&
    Array.isArray((data as PaginatedNewsResponse).results) &&
    (data as PaginatedNewsResponse).results.every(isNewsArticle)
  );
}

// Helper function to normalize the response
function normalizeNewsResponse(data: unknown): PaginatedNewsResponse {
  // If it's already a proper paginated response, return it
  if (isPaginatedNewsResponse(data)) {
    return data;
  }

  // If it's an array of news articles, convert to paginated format
  if (isNewsArticleArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data,
    };
  }

  // Fallback for unexpected formats
  console.warn("Unexpected API response format:", data);
  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export const newsService = {
  /**
   * Get paginated news articles
   */
  getNews: async (
    params: NewsParams = {},
    options: FetchOptions = {}
  ): Promise<PaginatedNewsResponse> => {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE, ...filters } = params;

    const endpoint = buildPaginatedUrl(
      NEWS_BASE_ENDPOINT,
      page,
      pageSize,
      filters
    );

    const data = await apiFetch<unknown>(endpoint, {
      next: {
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ["news"],
      },
      ...options,
    });

    return normalizeNewsResponse(data);
  },

  /**
   * Get a single news article by ID
   */
  getNewsById: async (
    id: number,
    options: FetchOptions = {}
  ): Promise<NewsArticle> => {
    const data = await apiFetch<unknown>(`${NEWS_BASE_ENDPOINT}/${id}/`, {
      next: {
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ["news", `news-${id}`],
      },
      ...options,
    });
    console.log(data);
    if (isNewsArticle(data)) {
      return data;
    }

    throw new Error("Invalid news article data received from API");
  },

  /**
   * Search news articles
   */
  searchNews: async (
    query: string,
    page: number = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
    options: FetchOptions = {}
  ): Promise<PaginatedNewsResponse> => {
    const endpoint = buildPaginatedUrl(NEWS_BASE_ENDPOINT, page, pageSize, {
      search: query,
    });

    const data = await apiFetch<unknown>(endpoint, {
      next: {
        revalidate: 1800, // 30 minutes for search
        tags: ["news", "search"],
      },
      ...options,
    });

    return normalizeNewsResponse(data);
  },
};
