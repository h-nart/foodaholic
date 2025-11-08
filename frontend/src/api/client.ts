import axios, { AxiosError } from 'axios';
import type {
  RecipeSearchResponse,
  RecipeDetailResponse,
  RecipeSearchRequest,
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // Request made but no response
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      errorMessage = error.message;
    }

    return Promise.reject({ message: errorMessage, originalError: error });
  }
);

// API methods
export const recipeApi = {
  /**
   * Search for recipes with filters
   */
  searchRecipes: async (params: RecipeSearchRequest): Promise<RecipeSearchResponse> => {
    const cleanParams: any = { ...params };
    
    // Remove undefined/null values
    Object.keys(cleanParams).forEach(key => {
      if (cleanParams[key] === undefined || cleanParams[key] === null || cleanParams[key] === '') {
        delete cleanParams[key];
      }
    });

    const response = await apiClient.get<RecipeSearchResponse>('/recipes/search', {
      params: cleanParams,
    });
    return response.data;
  },

  /**
   * Get recipe details by ID
   */
  getRecipeDetails: async (id: number): Promise<RecipeDetailResponse> => {
    const response = await apiClient.get<RecipeDetailResponse>(`/recipes/${id}`);
    return response.data;
  },
};

export default apiClient;

