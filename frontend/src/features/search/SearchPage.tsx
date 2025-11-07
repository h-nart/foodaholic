import React from 'react';
import { SearchBar, AdvancedFilters, RecipeGrid, EmptyState } from './components';
import { useRecipeSearch } from './hooks';
import './SearchPage.scss';

export const SearchPage: React.FC = () => {
  const {
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
  } = useRecipeSearch();

  return (
    <div className="search-page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="search-page__header">
        <div className="container">
          <h1 className="search-page__logo">
            <span role="img" aria-label="Food">
              🍳
            </span>{' '}
            Foodaholic
          </h1>
        </div>
      </header>

      <main id="main-content" className="search-page__main">
        <div className="container">
          <div className="search-page__search-section">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <AdvancedFilters
              filters={filterValues}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          {/* Results */}
          {loading && results.length === 0 ? (
            <EmptyState type="loading" />
          ) : results.length > 0 ? (
            <RecipeGrid
              recipes={results}
              totalResults={results.length}
              sentinelRef={sentinelRef}
              isLoadingMore={loadingMore}
              hasMore={hasMore}
            />
          ) : searchQuery.trim() ? (
            <EmptyState type="no-results" />
          ) : (
            <EmptyState type="initial" />
          )}
        </div>
      </main>
    </div>
  );
};
