import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchRecipeDetail,
  toggleExcludeIngredient,
  clearRecipeDetail,
  recalculateNutrition,
} from '../../../store/recipeDetailSlice';
import { addToast } from '../../../store/uiSlice';

export const useNutritionCalculator = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { recipe, loading, error, excludedIngredientIds, recalculatingNutrition } =
    useAppSelector((state) => state.recipeDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetail(Number(id)));
    }

    return () => {
      dispatch(clearRecipeDetail());
    };
  }, [id, dispatch]);

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

  const handleRemoveIngredient = (id: number) => {
    if (!recipe) return;

    // Toggle the ingredient to exclude it
    dispatch(toggleExcludeIngredient(id));

    // Auto-recalculate after a short delay
    setTimeout(() => {
      const newExcludedIds = [...excludedIngredientIds, id];
      const excludedNames = recipe.extendedIngredients
        .filter((ing) => newExcludedIds.includes(ing.id))
        .map((ing) => ing.name);

      dispatch(
        recalculateNutrition({
          id: recipe.id,
          request: {
            excludedIngredientIds: newExcludedIds,
            excludedIngredientNames: excludedNames,
          },
        })
      );
    }, 100);
  };

  const handleRestoreIngredient = (id: number) => {
    if (!recipe) return;

    // Toggle the ingredient to include it back
    dispatch(toggleExcludeIngredient(id));

    // Auto-recalculate after a short delay
    setTimeout(() => {
      const newExcludedIds = excludedIngredientIds.filter((excludedId) => excludedId !== id);
      const excludedNames = recipe.extendedIngredients
        .filter((ing) => newExcludedIds.includes(ing.id))
        .map((ing) => ing.name);

      dispatch(
        recalculateNutrition({
          id: recipe.id,
          request: {
            excludedIngredientIds: newExcludedIds,
            excludedIngredientNames: excludedNames,
          },
        })
      );
    }, 100);
  };

  return {
    recipe,
    loading,
    excludedIngredientIds,
    recalculatingNutrition,
    onRemoveIngredient: handleRemoveIngredient,
    onRestoreIngredient: handleRestoreIngredient,
  };
};

