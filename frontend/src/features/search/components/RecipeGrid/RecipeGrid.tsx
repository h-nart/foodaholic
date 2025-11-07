import React from 'react';
import { RecipeCard } from '../../../../components';
import type { RecipeSummary } from '../../../../types';
import './RecipeGrid.scss';

interface RecipeGridProps {
  recipes: RecipeSummary[];
  totalResults: number;
  sentinelRef?: React.RefObject<HTMLDivElement>;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  totalResults,
  sentinelRef,
  isLoadingMore,
  hasMore,
}) => {
  return (
    <div className="recipe-grid-container">
      <div className="recipe-grid__info" role="status" aria-live="polite">
        Found {recipes.length} of {totalResults < 20 ? totalResults : '20+'} results
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && sentinelRef && (
        <div ref={sentinelRef} className="recipe-grid__load-more">
          {isLoadingMore && (
            <div className="recipe-grid__loading" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true"></div>
              <span>Loading more recipes...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && recipes.length > 0 && (
        <div className="recipe-grid__end-message" role="status">
          You've reached the end of the results
        </div>
      )}
    </div>
  );
};

