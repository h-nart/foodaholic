// Type definitions matching backend DTOs

export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number | null;
  servings: number | null;
  cuisines: string[];
  dishTypes: string[];
}

export interface RecipeSearchResponse {
  offset: number;
  number: number;
  totalResults: number;
  results: RecipeSummary[];
}

export interface Ingredient {
  id: number;
  name: string;
  original: string;
}

export interface NutritionSummary {
  caloriesPerServing: number;
  totalCalories: number;
}

export interface RecipeDetailResponse {
  id: number;
  title: string;
  image: string;
  servings: number | null;
  readyInMinutes: number | null;
  summary: string;
  instructions: string;
  extendedIngredients: Ingredient[];
  nutrition: NutritionSummary;
}

export interface RecalculateNutritionRequest {
  excludedIngredientIds: number[];
  excludedIngredientNames: string[];
}

export interface RecalculateNutritionResponse {
  nutrition: NutritionSummary;
  excluded: {
    ids: number[];
    names: string[];
  };
  remainingIngredientsCount: number;
}

export interface RecipeSearchRequest {
  query: string;
  diet?: string;
  intolerances?: string;
  cuisine?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  maxReadyTime?: number;
  offset?: number;
  number?: number;
}

