import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchRecipeDetail,
  toggleExcludeIngredient,
  clearExcludedIngredients,
  clearRecipeDetail,
  recalculateNutrition,
} from '../../../store/recipeDetailSlice';
import { addToast } from '../../../store/uiSlice';

export const useNutritionCalculator = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { recipe, loading, error, excludedIngredientIds, recalculatingNutrition, recalculationResult } =
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

  const handleRecalculate = () => {
    if (!recipe || excludedIngredientIds.length === 0) return;

    const excludedNames = recipe.extendedIngredients
      .filter((ing) => excludedIngredientIds.includes(ing.id))
      .map((ing) => ing.name);

    dispatch(
      recalculateNutrition({
        id: recipe.id,
        request: {
          excludedIngredientIds,
          excludedIngredientNames: excludedNames,
        },
      })
    ).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(
          addToast({
            title: 'Nutrition Recalculated',
            description: 'Nutrition information has been updated based on your selections.',
            type: 'success',
          })
        );
      }
    });
  };

  return {
    recipe,
    loading,
    excludedIngredientIds,
    recalculatingNutrition,
    recalculationResult,
    onToggleExclude: (id: number) => dispatch(toggleExcludeIngredient(id)),
    onClearExcluded: () => dispatch(clearExcludedIngredients()),
    onRecalculate: handleRecalculate,
  };
};

