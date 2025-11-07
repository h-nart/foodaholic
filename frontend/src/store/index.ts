import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import recipeDetailReducer from './recipeDetailSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    recipeDetail: recipeDetailReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

