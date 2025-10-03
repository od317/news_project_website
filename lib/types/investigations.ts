// lib/types/investigations.ts
export interface InvestigationPage {
  id: number;
  page_number: number;
  title: string;
  content: string;
  image: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Investigation {
  id: number;
  title: string;
  description: string;
  total_pages: number;
  first_page_preview: string;
  published_at: string;
  created_at: string;
  is_published?: boolean;
  updated_at?: string;
  pages?: InvestigationPage[]; // Make pages optional
}

export interface PaginatedInvestigationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Investigation[];
}

export interface PaginatedInvestigationPagesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InvestigationPage[];
}

export interface InvestigationParams {
  page?: number;
  pageSize?: number;
}

export interface InvestigationPagesParams {
  page?: number;
  pageSize?: number;
}