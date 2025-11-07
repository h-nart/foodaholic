import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { recipeApi } from '../api/client';
import type { RecipeSummary, RecipeSearchRequest } from '../types';

interface RecipesState {
  results: RecipeSummary[];
  offset: number;
  totalResults: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  filters: RecipeSearchRequest;
  hasMore: boolean;
}

const initialState: RecipesState = {
  results: [],
  offset: 0,
  totalResults: 0,
  loading: false,
  loadingMore: false,
  error: null,
  filters: {
    query: '',
    number: 20,
  },
  hasMore: true,
};

// Async thunks
export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (params: RecipeSearchRequest, { rejectWithValue }) => {
    try {
      const response = await recipeApi.searchRecipes(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search recipes');
    }
  }
);

export const loadMoreRecipes = createAsyncThunk(
  'recipes/loadMore',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { recipes: RecipesState };
      const { filters, offset } = state.recipes;
      
      const response = await recipeApi.searchRecipes({
        ...filters,
        offset: offset + (filters.number || 20),
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load more recipes');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<RecipeSearchRequest>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetSearch: (state) => {
      state.results = [];
      state.offset = 0;
      state.totalResults = 0;
      state.error = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search recipes
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.offset = action.payload.offset;
        state.totalResults = action.payload.totalResults;
        state.hasMore = action.payload.results.length + action.payload.offset < action.payload.totalResults;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load more recipes
      .addCase(loadMoreRecipes.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(loadMoreRecipes.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.results = [...state.results, ...action.payload.results];
        state.offset = action.payload.offset;
        state.hasMore = state.results.length < action.payload.totalResults;
      })
      .addCase(loadMoreRecipes.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateFilters, resetSearch } = recipesSlice.actions;
export default recipesSlice.reducer;

