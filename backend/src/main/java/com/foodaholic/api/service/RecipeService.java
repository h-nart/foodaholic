package com.foodaholic.api.service;

import com.foodaholic.api.client.SpoonacularClient;
import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.dto.response.RecipeSummary;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final SpoonacularClient client;
    private final NutritionService nutritionService;

    public RecipeSearchResponse search(RecipeSearchRequest request) {
        SpoonacularSearchResponse response = client.searchRecipes(request);

        if (response == null) return new RecipeSearchResponse(0, 0, 0, List.of());

        List<RecipeSummary> list = response.results() == null ? List.of() :
            response.results().stream().map(RecipeSummary::new).collect(Collectors.toList());
        return new RecipeSearchResponse(response.offset(), response.number(), response.totalResults(), list);
    }

    @Cacheable(value = "recipeDetails", key = "#id", unless = "#result == null")
    public RecipeDetailResponse getDetails(long id) {
        SpoonacularRecipeInformation info = client.getRecipeInformation(id, true);

        if (info == null) {
            return new RecipeDetailResponse(0, null, null, null, null,
                    null, null, List.of(), new NutritionSummary(0, 0));
        }

        nutritionService.updateIngredientsCalories(info);
        return new RecipeDetailResponse(info, nutritionService.extractNutritionSummary(info));
    }
}
