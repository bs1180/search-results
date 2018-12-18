import "isomorphic-fetch";
import { SortOrder, SearchResult } from "./types";
import { EXCHANGE_RATES_URL, API_URL, RESULTS_SIZE } from "./config";

export const getExchangeRates = (): Promise<{ AUD: number; USD: number }> =>
  fetch(EXCHANGE_RATES_URL)
    .then(res => res.json())
    .then(res => res.rates);

const getFakeResults = () => fetch(API_URL).then(res => res.json());

const getSorterFn = (sort: SortOrder): ((a, b) => number) => {
  switch (sort) {
    case SortOrder.highestPrice:
      return (b, a) => a.price_eur - b.price_eur;
    case SortOrder.lowestPrice:
      return (a, b) => a.price_eur - b.price_eur;
    case SortOrder.longestTour:
      return (b, a) => a.length - b.length;
    case SortOrder.shortestTour:
      return (a, b) => a.length - b.length;
  }
};

export const getSearchResults = async ({
  sort,
  page = 1
}: {
  sort?: SortOrder;
  page: number;
}): Promise<{ results: SearchResult[]; count: number; sortedBy: SortOrder }> => {
  // Search results are in multiple currencies, so we do a lookup of the current exchange rates and convert AUD and USD into EUR

  const [exchangeRates, searchResults] = await Promise.all([getExchangeRates(), getFakeResults()]);

  const multiplier = {
    AUD: exchangeRates.AUD,
    USD: exchangeRates.USD,
    EUR: 1
  };

  let fullResults = searchResults.map(result => ({
    price_eur: parseFloat((result.price * multiplier[result.currency]).toFixed(0)),
    ...result
  }));

  // The fake API doesn't support sorting or pagination so we'll do it here
  if (sort) {
    fullResults = fullResults.sort(getSorterFn(sort));
  }

  const begin = (page - 1) * RESULTS_SIZE;
  const end = begin + RESULTS_SIZE;

  return {
    results: fullResults.slice(begin, end),
    count: fullResults.length,
    sortedBy: sort
  };
};
