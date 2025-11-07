import React from 'react';
import type { Ingredient } from '../../../../types';

interface IngredientsListProps {
  ingredients: Ingredient[];
  excludedIds: number[];
  onRemove: (id: number) => void;
  onRestore: (id: number) => void;
  isRecalculating: boolean;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  excludedIds,
  onRemove,
  onRestore,
  isRecalculating,
}) => {
  return (
    <ul className="ingredients-list" role="list">
      {ingredients.map((ingredient) => {
        const isExcluded = excludedIds.includes(ingredient.id);
        
        return (
          <li key={ingredient.id} className={`ingredient-item ${isExcluded ? 'ingredient-item--excluded' : ''}`}>
            <span className={`ingredient-text ${isExcluded ? 'ingredient-text--excluded' : ''}`}>
              {ingredient.original}
            </span>
            {isExcluded ? (
              <button
                onClick={() => onRestore(ingredient.id)}
                className="ingredient-restore"
                aria-label={`Restore ${ingredient.name}`}
                disabled={isRecalculating}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => onRemove(ingredient.id)}
                className="ingredient-delete"
                aria-label={`Remove ${ingredient.name}`}
                disabled={isRecalculating}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

