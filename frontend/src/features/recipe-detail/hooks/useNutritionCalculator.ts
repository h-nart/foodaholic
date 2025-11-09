import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchRecipeDetail,
  toggleExcludeIngredient,
  clearRecipeDetail,
} from '../../../store/recipeDetailSlice';
import { addToast } from '../../../store/uiSlice';

export const useNutritionCalculator = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { recipe, loading, error, excludedIngredientIds } =
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

  const handleToggleIngredient = (id: number) => {
    // Toggle state - nutrition recalculates automatically in Redux
    dispatch(toggleExcludeIngredient(id));
  };

  return {
    recipe,
    loading,
    excludedIngredientIds,
    onRemoveIngredient: handleToggleIngredient,
    onRestoreIngredient: handleToggleIngredient,
  };
};

