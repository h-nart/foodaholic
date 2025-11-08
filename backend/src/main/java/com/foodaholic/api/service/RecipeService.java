package com.foodaholic.api.service;

import com.foodaholic.api.client.SpoonacularClient;
import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.dto.response.RecipeSummary;
import com.foodaholic.api.dto.spoonacular.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularIngredientNutrition;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final SpoonacularClient client;
    private final NutritionService nutritionService;

    public RecipeSearchResponse search(RecipeSearchRequest request) {
        SpoonacularSearchResponse api = client.searchRecipes(request);
        if (api == null) return new RecipeSearchResponse(0, 0, 0, List.of());
        List<RecipeSummary> list = api.results() == null ? List.of() :
            api.results().stream().map(r ->
                new RecipeSummary(
                    r.id(),
                    r.title(),
                    r.image(),
                    r.readyInMinutes(),
                    r.servings(),
                    r.cuisines(),
                    r.dishTypes()
                )
            ).collect(Collectors.toList());
        return new RecipeSearchResponse(api.offset(), api.number(), api.totalResults(), list);
    }

    public RecipeDetailResponse getDetails(long id) {
        SpoonacularRecipeInformation info = client.getRecipeInformation(id, true);
        if (info == null) {
            return new RecipeDetailResponse(0, null, null, null, null, null, null, List.of(), new NutritionSummary(0, 0));
        }

        HashMap<Long, Double> caloriesById = new HashMap<>();
        HashMap<String, Double> caloriesByNameLower = new HashMap<>();
        if (info.nutrition() != null && info.nutrition().ingredients() != null) {
            for (SpoonacularIngredientNutrition ingNut : info.nutrition().ingredients()) {
                if (ingNut == null || ingNut.nutrients() == null) continue;
                Double calories = ingNut.nutrients().stream()
                    .filter(n -> n != null && "Calories".equals(n.name()))
                    .map(Nutrient::amount)
                    .findFirst()
                    .orElse(null);
                if (calories != null) {
                    if (ingNut.id() != null) caloriesById.put(ingNut.id(), calories);
                    if (ingNut.name() != null) caloriesByNameLower.put(ingNut.name().toLowerCase(Locale.ROOT), calories);
                }
            }
        }
        List<RecipeDetailResponse.Ingredient> ingredients = info.extendedIngredients() == null ? List.of() :
            info.extendedIngredients().stream()
                .map(e -> {
                    Double calories = null;
                    if (e != null) {
                        if (e.id() != null) {
                            calories = caloriesById.get(e.id());
                        }
                        if (calories == null && e.name() != null) {
                            calories = caloriesByNameLower.get(e.name().toLowerCase(Locale.ROOT));
                        }
                    }
                    return new RecipeDetailResponse.Ingredient(e.id(), e.name(), e.original(), calories);
                })
                .collect(Collectors.toList());
        double perServing = nutritionService.extractCaloriesPerServing(info);
        int servings = info.servings() != null ? info.servings() : 1;
        NutritionSummary summary = new NutritionSummary(perServing, perServing * servings);
        return new RecipeDetailResponse(
            info.id(),
            info.title(),
            info.image(),
            info.servings(),
            info.readyInMinutes(),
            info.summary(),
            info.instructions(),
            ingredients,
            summary
        );
    }
}
