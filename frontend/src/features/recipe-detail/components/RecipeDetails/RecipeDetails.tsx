import React, { useState, useEffect } from 'react';
import type { Ingredient, NutritionSummary } from '../../../../types';
import { useAppDispatch } from '../../../../store/hooks';
import { addToast } from '../../../../store/uiSlice';
import { IngredientsList } from './IngredientsList';
import { CalorieDisplay } from './CalorieDisplay';
import './RecipeDetails.scss';

interface RecipeDetailsProps {
  ingredients: Ingredient[];
  nutrition: NutritionSummary;
  excludedIds: number[];
  onRemoveIngredient: (id: number) => void;
  onRestoreIngredient: (id: number) => void;
  isRecalculating: boolean;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  ingredients,
  nutrition,
  excludedIds,
  onRemoveIngredient,
  onRestoreIngredient,
  isRecalculating,
}) => {
  const dispatch = useAppDispatch();
  const [pendingAction, setPendingAction] = useState<{ id: number; calories: number; isRemoval: boolean } | null>(null);
  const [previousCalories, setPreviousCalories] = useState<number>(nutrition.totalCalories);

  // Track calorie changes
  useEffect(() => {
    if (pendingAction && Math.round(previousCalories) !== Math.round(nutrition.totalCalories)) {
      const calorieDiff = Math.round(Math.abs(previousCalories - nutrition.totalCalories));
      
      // Find the ingredient
      const ingredient = ingredients.find((ing) => ing.id === pendingAction.id);
      
      if (ingredient && calorieDiff > 0) {
        if (pendingAction.isRemoval) {
          // Ingredient was removed
          dispatch(
            addToast({
              title: `Removed ${ingredient.name}`,
              description: `-${calorieDiff} kcal`,
              type: 'info',
              duration: 3000,
            })
          );
        } else {
          // Ingredient was restored
          dispatch(
            addToast({
              title: `Added back ${ingredient.name}`,
              description: `+${calorieDiff} kcal`,
              type: 'success',
              duration: 3000,
            })
          );
        }
      }
      
      setPendingAction(null);
      setPreviousCalories(nutrition.totalCalories);
    }
  }, [nutrition.totalCalories, previousCalories, pendingAction, ingredients, dispatch]);

  const handleRemove = (id: number) => {
    setPreviousCalories(nutrition.totalCalories);
    setPendingAction({ id, calories: nutrition.totalCalories, isRemoval: true });
    onRemoveIngredient(id);
  };

  const handleRestore = (id: number) => {
    setPreviousCalories(nutrition.totalCalories);
    setPendingAction({ id, calories: nutrition.totalCalories, isRemoval: false });
    onRestoreIngredient(id);
  };

  return (
    <section className="recipe-details" aria-labelledby="details-heading">
      <h2 id="details-heading" className="recipe-details__title">
        Recipe Details
      </h2>

      <div className="recipe-details__content">
        <IngredientsList
          ingredients={ingredients}
          excludedIds={excludedIds}
          onRemove={handleRemove}
          onRestore={handleRestore}
          isRecalculating={isRecalculating}
        />

        <CalorieDisplay nutrition={nutrition} isRecalculating={isRecalculating} />
      </div>
    </section>
  );
};

