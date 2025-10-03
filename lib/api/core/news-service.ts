// lib/api/news-service.ts
import { apiFetch, buildPaginatedUrl, FetchOptions } from './core';
import { 
  NewsArticle, 
  PaginatedNewsResponse, 
  NewsParams 
} from '@/lib/types';

const NEWS_BASE_ENDPOINT = '/news';
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_REVALIDATE_TIME = 3600; // 1 hour

// Helper function to normalize the response
function normalizeNewsResponse(data: any): PaginatedNewsResponse {
  // If it's already a paginated response, return it
  if (data && typeof data === 'object' && 'results' in data) {
    return data as PaginatedNewsResponse;
  }
  
  // If it's an array, convert it to paginated response format
  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data
    };
  }
  
  // Fallback for unexpected formats
  return {
    count: 0,
    next: null,
    previous: null,
    results: []
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

    const data = await apiFetch<any>(endpoint, {
      next: { 
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ['news'] 
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
    return apiFetch<NewsArticle>(`${NEWS_BASE_ENDPOINT}/${id}/`, {
      next: { 
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ['news', `news-${id}`] 
      },
      ...options,
    });
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
    const endpoint = buildPaginatedUrl(
      NEWS_BASE_ENDPOINT,
      page,
      pageSize,
      { search: query }
    );

    const data = await apiFetch<any>(endpoint, {
      next: { 
        revalidate: 1800, // 30 minutes for search
        tags: ['news', 'search'] 
      },
      ...options,
    });

    return normalizeNewsResponse(data);
  },
};