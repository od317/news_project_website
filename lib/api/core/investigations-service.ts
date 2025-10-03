// lib/api/investigations-service.ts
import { apiFetch, buildPaginatedUrl, FetchOptions } from './core';
import {
  Investigation,
  InvestigationPage,
  PaginatedInvestigationsResponse,
  PaginatedInvestigationPagesResponse,
  InvestigationParams,
  InvestigationPagesParams
} from '@/lib/types';

const INVESTIGATIONS_BASE_ENDPOINT = '/investigations';
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_REVALIDATE_TIME = 3600; // 1 hour

export const investigationsService = {
  /**
   * Get paginated investigations
   */
  getInvestigations: async (
    params: InvestigationParams = {},
    options: FetchOptions = {}
  ): Promise<PaginatedInvestigationsResponse> => {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;
    
    const endpoint = buildPaginatedUrl(
      INVESTIGATIONS_BASE_ENDPOINT,
      page,
      pageSize
    );

    return apiFetch<PaginatedInvestigationsResponse>(endpoint, {
      next: { 
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ['investigations'] 
      },
      ...options,
    });
  },

  /**
   * Get a single investigation by ID
   */
  getInvestigationById: async (
    id: number,
    options: FetchOptions = {}
  ): Promise<Investigation> => {
    return apiFetch<Investigation>(`${INVESTIGATIONS_BASE_ENDPOINT}/${id}/`, {
      next: { 
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ['investigations', `investigation-${id}`] 
      },
      ...options,
    });
  },

  /**
   * Get paginated pages for a specific investigation
   */
  getInvestigationPages: async (
    investigationId: number,
    params: InvestigationPagesParams = {},
    options: FetchOptions = {}
  ): Promise<PaginatedInvestigationPagesResponse> => {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;
    
    const endpoint = buildPaginatedUrl(
      `${INVESTIGATIONS_BASE_ENDPOINT}/${investigationId}/pages`,
      page,
      pageSize
    );

    return apiFetch<PaginatedInvestigationPagesResponse>(endpoint, {
      next: { 
        revalidate: DEFAULT_REVALIDATE_TIME,
        tags: ['investigation-pages', `investigation-${investigationId}-pages`] 
      },
      ...options,
    });
  },

  /**
   * Get a specific page from an investigation
   */
  getInvestigationPage: async (
    investigationId: number,
    pageNumber: number,
    options: FetchOptions = {}
  ): Promise<InvestigationPage> => {
    // Note: This endpoint might need adjustment based on actual API
    // Assuming endpoint structure: /investigations/{id}/pages/{page_number}/
    return apiFetch<InvestigationPage>(
      `${INVESTIGATIONS_BASE_ENDPOINT}/${investigationId}/pages/${pageNumber}/`,
      {
        next: { 
          revalidate: DEFAULT_REVALIDATE_TIME,
          tags: [
            'investigation-pages', 
            `investigation-${investigationId}-page-${pageNumber}`
          ] 
        },
        ...options,
      }
    );
  },
};