import React from 'react';
import type { NutritionSummary } from '../../../../types';

interface CalorieDisplayProps {
  nutrition: NutritionSummary;
  isRecalculating: boolean;
}

export const CalorieDisplay: React.FC<CalorieDisplayProps> = ({ nutrition, isRecalculating }) => {
  return (
    <div className="calorie-info">
      <div className="calorie-row">
        <span className="calorie-label">Total:</span>
        <span className="calorie-value">
          {isRecalculating ? (
            <span className="calorie-loading">Calculating...</span>
          ) : (
            `${Math.round(nutrition.totalCalories)} kcal`
          )}
        </span>
      </div>
      <div className="calorie-row calorie-row--secondary">
        <span className="calorie-label">Per Serving:</span>
        <span className="calorie-value">
          {isRecalculating ? (
            <span className="calorie-loading">Calculating...</span>
          ) : (
            `${Math.round(nutrition.caloriesPerServing)} kcal`
          )}
        </span>
      </div>
    </div>
  );
};

