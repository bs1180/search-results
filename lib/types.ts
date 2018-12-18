export enum Currency {
  EUR = "EUR",
  AUD = "AUD",
  USD = "USD"
}

export interface RawSearchResult {
  id: number;
  tour_name: string;
  length: number;
  description: string;
  price: number;
  saving: number;
  currency: Currency;
  destinations: string[];
  age_from: number;
  age_to: number;
  rating: number;
  tour_operator: string;
  country: string;
  tour_image: string;
  map_image: string;
}

export interface SearchResult extends RawSearchResult {
  price_eur: number;
}

export enum SortOrder {
  lowestPrice = "lowest-price",
  highestPrice = "highest-price",
  shortestTour = "shortest-tour",
  longestTour = "longest-tour"
}

export type QueryParams = {
  sort: SortOrder;
  page: string;
};
