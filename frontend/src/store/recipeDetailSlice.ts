import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { recipeApi } from '../api/client';
import type { RecipeDetailResponse, RecalculateNutritionRequest } from '../types';

interface RecipeDetailState {
  recipe: RecipeDetailResponse | null;
  loading: boolean;
  error: string | null;
  excludedIngredientIds: number[];
  recalculatingNutrition: boolean;
  recalculationResult: {
    successfullyExcluded: number[];
    notFound: string[];
  } | null;
}

const initialState: RecipeDetailState = {
  recipe: null,
  loading: false,
  error: null,
  excludedIngredientIds: [],
  recalculatingNutrition: false,
  recalculationResult: null,
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

export const recalculateNutrition = createAsyncThunk(
  'recipeDetail/recalculateNutrition',
  async (
    { id, request }: { id: number; request: RecalculateNutritionRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await recipeApi.recalculateNutrition(id, request);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to recalculate nutrition');
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
    },
    clearExcludedIngredients: (state) => {
      state.excludedIngredientIds = [];
      state.recalculationResult = null;
    },
    clearRecipeDetail: (state) => {
      state.recipe = null;
      state.excludedIngredientIds = [];
      state.recalculationResult = null;
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
        state.recalculationResult = null;
      })
      .addCase(fetchRecipeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Recalculate nutrition
      .addCase(recalculateNutrition.pending, (state) => {
        state.recalculatingNutrition = true;
        state.error = null;
      })
      .addCase(recalculateNutrition.fulfilled, (state, action) => {
        state.recalculatingNutrition = false;
        if (state.recipe) {
          state.recipe.nutrition = action.payload.nutrition;
        }
        state.recalculationResult = {
          successfullyExcluded: action.payload.excluded.ids,
          notFound: action.payload.excluded.names,
        };
      })
      .addCase(recalculateNutrition.rejected, (state, action) => {
        state.recalculatingNutrition = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleExcludeIngredient, clearExcludedIngredients, clearRecipeDetail } = recipeDetailSlice.actions;
export default recipeDetailSlice.reducer;

