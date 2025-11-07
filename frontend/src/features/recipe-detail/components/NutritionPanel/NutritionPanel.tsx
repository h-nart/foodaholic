import React from 'react';
import type { NutritionSummary } from '../../../../types';
import './NutritionPanel.scss';

interface NutritionPanelProps {
  nutrition: NutritionSummary;
  recalculationResult?: {
    successfullyExcluded: number[];
    notFound: string[];
  } | null;
}

export const NutritionPanel: React.FC<NutritionPanelProps> = ({ nutrition, recalculationResult }) => {
  return (
    <section className="nutrition-panel" aria-labelledby="nutrition-heading">
      <h2 id="nutrition-heading" className="nutrition-panel__title">
        Nutrition Information
      </h2>
      <div className="nutrition-panel__content">
        <div className="nutrition-item">
          <span className="nutrition-item__label">Per Serving:</span>
          <span className="nutrition-item__value">{Math.round(nutrition.caloriesPerServing)} cal</span>
        </div>
        <div className="nutrition-item">
          <span className="nutrition-item__label">Total:</span>
          <span className="nutrition-item__value">{Math.round(nutrition.totalCalories)} cal</span>
        </div>
      </div>

      {recalculationResult && (
        <div className="nutrition-panel__result" role="status" aria-live="polite">
          <p className="result-text result-text--success">
            ✓ Successfully excluded {recalculationResult.successfullyExcluded.length} ingredient(s)
          </p>
          {recalculationResult.notFound.length > 0 && (
            <p className="result-text result-text--warning">
              ⚠ Could not find: {recalculationResult.notFound.join(', ')}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

