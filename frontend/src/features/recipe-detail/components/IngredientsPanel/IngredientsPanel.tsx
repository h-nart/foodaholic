import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import type { Ingredient } from '../../../../types';
import './IngredientsPanel.scss';

interface IngredientsPanelProps {
  ingredients: Ingredient[];
  excludedIds: number[];
  onToggleExclude: (id: number) => void;
  onClearExcluded: () => void;
  onRecalculate: () => void;
  isRecalculating: boolean;
}

export const IngredientsPanel: React.FC<IngredientsPanelProps> = ({
  ingredients,
  excludedIds,
  onToggleExclude,
  onClearExcluded,
  onRecalculate,
  isRecalculating,
}) => {
  return (
    <section className="ingredients-panel" aria-labelledby="ingredients-heading">
      <div className="ingredients-panel__header">
        <h2 id="ingredients-heading" className="ingredients-panel__title">
          Ingredients
        </h2>
        {excludedIds.length > 0 && (
          <button onClick={onClearExcluded} className="button button--text" aria-label="Clear all excluded ingredients">
            Clear
          </button>
        )}
      </div>

      <ul className="ingredients-list" role="list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="ingredient-item">
            <Checkbox.Root
              className="checkbox-root"
              id={`ingredient-${ingredient.id}`}
              checked={excludedIds.includes(ingredient.id)}
              onCheckedChange={() => onToggleExclude(ingredient.id)}
              aria-label={`Exclude ${ingredient.name}`}
            >
              <Checkbox.Indicator className="checkbox-indicator">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={`ingredient-${ingredient.id}`} className="ingredient-label">
              {ingredient.original}
            </label>
          </li>
        ))}
      </ul>

      <div className="ingredients-panel__actions">
        <p className="ingredients-help">Select ingredients to exclude and recalculate nutrition</p>
        <button
          onClick={onRecalculate}
          disabled={excludedIds.length === 0 || isRecalculating}
          className="button button--primary button--full"
          aria-label="Recalculate nutrition without selected ingredients"
        >
          {isRecalculating ? (
            <>
              <div className="button-spinner" aria-hidden="true"></div>
              Recalculating...
            </>
          ) : (
            <>Recalculate Nutrition</>
          )}
        </button>
      </div>
    </section>
  );
};

