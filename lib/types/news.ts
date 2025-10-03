// lib/types/news.ts
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  body?: string;
  image: string | null;
  author_name: string;
  published_at: string;
  created_at: string;
  resources?: NewsResource[];
  is_published?: boolean;
  updated_at?: string;
  author?: number;
}

export interface NewsResource {
  id: number;
  title: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedNewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

export interface NewsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
}