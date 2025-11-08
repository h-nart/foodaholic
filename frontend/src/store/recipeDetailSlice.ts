import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { recipeApi } from '../api/client';
import type { RecipeDetailResponse } from '../types';

interface RecipeDetailState {
  recipe: RecipeDetailResponse | null;
  loading: boolean;
  error: string | null;
  excludedIngredientIds: number[];
}

const initialState: RecipeDetailState = {
  recipe: null,
  loading: false,
  error: null,
  excludedIngredientIds: [],
};

// Async thunks
export const fetchRecipeDetail = createAsyncThunk(
  'recipeDetail/fetch',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await recipeApi.getRecipeDetails(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recipe details');
    }
  }
);

const recipeDetailSlice = createSlice({
  name: 'recipeDetail',
  initialState,
  reducers: {
    toggleExcludeIngredient: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.excludedIngredientIds.indexOf(id);
      
      if (index > -1) {
        state.excludedIngredientIds.splice(index, 1);
      } else {
        state.excludedIngredientIds.push(id);
      }

      // Recalculate nutrition locally
      if (state.recipe) {
        const activeIngredients = state.recipe.extendedIngredients.filter(
          (ing) => !state.excludedIngredientIds.includes(ing.id)
        );
        // Ingredient calories are per serving, so sum them up
        const caloriesPerServing = activeIngredients.reduce((sum, ing) => sum + ing.calories, 0);
        const servings = state.recipe.servings || 1;
        
        state.recipe.nutrition = {
          caloriesPerServing,
          totalCalories: caloriesPerServing * servings,
        };
      }
    },
    clearExcludedIngredients: (state) => {
      state.excludedIngredientIds = [];
      
      // Reset nutrition to include all ingredients
      if (state.recipe) {
        // Ingredient calories are per serving, so sum them up
        const caloriesPerServing = state.recipe.extendedIngredients.reduce(
          (sum, ing) => sum + ing.calories, 
          0
        );
        const servings = state.recipe.servings || 1;
        
        state.recipe.nutrition = {
          caloriesPerServing,
          totalCalories: caloriesPerServing * servings,
        };
      }
    },
    clearRecipeDetail: (state) => {
      state.recipe = null;
      state.excludedIngredientIds = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recipe detail
      .addCase(fetchRecipeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
        state.excludedIngredientIds = [];
      })
      .addCase(fetchRecipeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleExcludeIngredient, clearExcludedIngredients, clearRecipeDetail } = recipeDetailSlice.actions;
export default recipeDetailSlice.reducer;

