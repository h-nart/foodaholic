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
  const [searchParams, setSearchParams] = useSearchParams();
  const { results, loading, loadingMore, error, filters, hasMore } = useAppSelector(
    (state) => state.recipes
  );

  // Get initial query from URL params or Redux state
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery || filters.query);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    diet: searchParams.get('diet') || 'any',
    cuisine: searchParams.get('cuisine') || 'any',
    type: searchParams.get('type') || 'any',
    selectedIntolerances: searchParams.get('intolerances')?.split(',').filter(Boolean) || [],
    includeIngredients: searchParams.get('includeIngredients') || '',
    excludeIngredients: searchParams.get('excludeIngredients') || '',
    maxReadyTime: [parseInt(searchParams.get('maxReadyTime') || '120')],
  });

  const debouncedQuery = useDebounce(searchQuery, 500);

  // Initialize search query from URL on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl && queryFromUrl !== searchQuery) {
      setSearchQuery(queryFromUrl);
    }
  }, []);

  // Infinite scroll
  const sentinelRef = useInfiniteScroll({
    loading: loadingMore,
    hasMore,
    onLoadMore: () => dispatch(loadMoreRecipes()),
  });

  // Search when debounced query or filters change
  useEffect(() => {
    if (debouncedQuery.trim()) {
      // Update URL params
      const params = new URLSearchParams();
      params.set('q', debouncedQuery);
      
      if (filterValues.diet !== 'any') params.set('diet', filterValues.diet);
      if (filterValues.cuisine !== 'any') params.set('cuisine', filterValues.cuisine);
      if (filterValues.type !== 'any') params.set('type', filterValues.type);
      if (filterValues.selectedIntolerances.length > 0) {
        params.set('intolerances', filterValues.selectedIntolerances.join(','));
      }
      if (filterValues.includeIngredients) params.set('includeIngredients', filterValues.includeIngredients);
      if (filterValues.excludeIngredients) params.set('excludeIngredients', filterValues.excludeIngredients);
      if (filterValues.maxReadyTime[0] !== 120) params.set('maxReadyTime', filterValues.maxReadyTime[0].toString());
      
      setSearchParams(params, { replace: true });

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
    } else {
      // Clear URL params if query is empty
      setSearchParams({}, { replace: true });
    }
  }, [debouncedQuery, filterValues]);

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

