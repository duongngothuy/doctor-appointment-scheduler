// Listing Types
export interface Listing {
  id: number;
  title: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude?: number;
  longitude?: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  property_type: string;
  amenities: string[];
  images: string[];
  created_at: string;
  updated_at?: string;
}

export interface ListingSearchParams {
  city?: string;
  state?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  property_type?: string;
  page?: number;
  limit?: number;
}

// Budget Calculator Types
export interface BudgetInput {
  annual_salary: number;
  monthly_debt: number;
  location?: string;
}

export interface BudgetResult {
  gross_monthly_income: number;
  estimated_taxes: number;
  net_monthly_income: number;
  max_rent_30_percent: number;
  recommended_rent: number;
  comfortable_rent: number;
  disposable_after_max_rent: number;
  disposable_after_recommended: number;
  debt_to_income_ratio: number;
  rent_to_income_ratio: number;
  financial_health_score: 'healthy' | 'moderate' | 'stretched';
}
