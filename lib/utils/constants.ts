// lib/utils/constants.ts
export const API_BASE_URL = 'https://od317.pythonanywhere.com/api';

export const CACHE_STRATEGIES = {
  NEWS: {
    revalidate: 3600, // 1 hour
    tags: ['news'],
  },
  INVESTIGATIONS: {
    revalidate: 3600, // 1 hour
    tags: ['investigations'],
  },
  SEARCH: {
    revalidate: 1800, // 30 minutes
    tags: ['search'],
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;