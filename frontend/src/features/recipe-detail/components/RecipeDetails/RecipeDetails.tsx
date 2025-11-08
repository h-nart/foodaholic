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
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  ingredients,
  nutrition,
  excludedIds,
  onRemoveIngredient,
  onRestoreIngredient,
}) => {
  const dispatch = useAppDispatch();
  const [previousCalories, setPreviousCalories] = useState<number>(nutrition.totalCalories);
  const [lastAction, setLastAction] = useState<{ id: number; isRemoval: boolean } | null>(null);

  // Track calorie changes and show toast
  useEffect(() => {
    if (lastAction && Math.round(previousCalories) !== Math.round(nutrition.totalCalories)) {
      const calorieDiff = Math.round(Math.abs(previousCalories - nutrition.totalCalories));
      
      // Find the ingredient
      const ingredient = ingredients.find((ing) => ing.id === lastAction.id);
      
      if (ingredient && calorieDiff > 0) {
        if (lastAction.isRemoval) {
          // Ingredient was removed
          dispatch(
            addToast({
              title: `Removed ${ingredient.name}`,
              description: `-${calorieDiff} kcal`,
              type: 'info',
              duration: 1500,
            })
          );
        } else {
          // Ingredient was restored
          dispatch(
            addToast({
              title: `Added back ${ingredient.name}`,
              description: `+${calorieDiff} kcal`,
              type: 'success',
              duration: 1500,
            })
          );
        }
      }
      
      setLastAction(null);
      setPreviousCalories(nutrition.totalCalories);
    }
  }, [nutrition.totalCalories, previousCalories, lastAction, ingredients, dispatch]);

  const handleRemove = (id: number) => {
    setPreviousCalories(nutrition.totalCalories);
    setLastAction({ id, isRemoval: true });
    onRemoveIngredient(id);
  };

  const handleRestore = (id: number) => {
    setPreviousCalories(nutrition.totalCalories);
    setLastAction({ id, isRemoval: false });
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
        />

        <CalorieDisplay nutrition={nutrition} />
      </div>
    </section>
  );
};

