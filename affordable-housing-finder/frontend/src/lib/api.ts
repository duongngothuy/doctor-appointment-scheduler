import { Listing, ListingSearchParams, BudgetInput, BudgetResult } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const listingsApi = {
  getAll: async (params?: ListingSearchParams): Promise<Listing[]> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return fetchApi<Listing[]>(`/listings/${query ? `?${query}` : ''}`);
  },

  getById: async (id: number): Promise<Listing> => {
    return fetchApi<Listing>(`/listings/${id}`);
  },
};

export const calculatorApi = {
  calculateBudget: async (input: BudgetInput): Promise<BudgetResult> => {
    return fetchApi<BudgetResult>('/calculator/budget', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
