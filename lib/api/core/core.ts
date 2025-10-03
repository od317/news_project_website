// lib/api/core.ts
const API_BASE_URL = 'https://od317.pythonanywhere.com/api';

export type FetchOptions = {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  cache?: RequestCache;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred');
  }
}

// Helper function for paginated responses
export function buildPaginatedUrl(
  baseEndpoint: string,
  page?: number,
  pageSize?: number,
  params?: Record<string, string | number>
): string {
  const urlParams = new URLSearchParams();
  
  if (page) urlParams.append('page', page.toString());
  if (pageSize) urlParams.append('page_size', pageSize.toString());
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) urlParams.append(key, value.toString());
    });
  }
  
  const queryString = urlParams.toString();
  return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
}