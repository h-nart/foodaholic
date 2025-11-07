import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { searchRecipes, loadMoreRecipes, updateFilters, resetSearch } from '../../../store/recipesSlice';
import { addToast } from '../../../store/uiSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import type { FilterValues } from '../components';

export const useRecipeSearch = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { results, loading, loadingMore, error, filters, hasMore } = useAppSelector(
    (state) => state.recipes
  );

  // Get initial query from URL params or Redux state
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery || filters.query);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    diet: 'any',
    cuisine: 'any',
    type: 'any',
    selectedIntolerances: [],
    includeIngredients: '',
    excludeIngredients: '',
    maxReadyTime: [120],
  });

  const debouncedQuery = useDebounce(searchQuery, 500);

  // Initialize search query from URL on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl && queryFromUrl !== searchQuery) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  // Infinite scroll
  const sentinelRef = useInfiniteScroll({
    loading: loadingMore,
    hasMore,
    onLoadMore: () => dispatch(loadMoreRecipes()),
  });

  // Search when debounced query or filters change
  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(resetSearch());
      dispatch(updateFilters({ query: debouncedQuery }));
      dispatch(
        searchRecipes({
          query: debouncedQuery,
          diet: filterValues.diet !== 'any' ? filterValues.diet : undefined,
          intolerances: filterValues.selectedIntolerances.join(',') || undefined,
          cuisine: filterValues.cuisine !== 'any' ? filterValues.cuisine : undefined,
          includeIngredients: filterValues.includeIngredients || undefined,
          excludeIngredients: filterValues.excludeIngredients || undefined,
          type: filterValues.type !== 'any' ? filterValues.type : undefined,
          maxReadyTime: filterValues.maxReadyTime[0] !== 120 ? filterValues.maxReadyTime[0] : undefined,
          number: 20,
          offset: 0,
        })
      );
    }
  }, [debouncedQuery, filterValues, dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      dispatch(
        addToast({
          title: 'Error',
          description: error,
          type: 'error',
        })
      );
    }
  }, [error, dispatch]);

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    setFilterValues((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilterValues({
      diet: 'any',
      cuisine: 'any',
      type: 'any',
      selectedIntolerances: [],
      includeIngredients: '',
      excludeIngredients: '',
      maxReadyTime: [120],
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    filterValues,
    handleFilterChange,
    handleClearFilters,
    results,
    loading,
    loadingMore,
    hasMore,
    sentinelRef,
  };
};

