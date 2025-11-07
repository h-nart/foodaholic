package com.foodaholic.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import com.foodaholic.api.client.SpoonacularClient;
import com.foodaholic.api.dto.request.RecalculateNutritionRequest;
import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecalculateNutritionResponse;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.dto.response.RecipeSummary;
import com.foodaholic.api.dto.spoonacular.SpoonacularParsedIngredient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

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
        List<RecipeDetailResponse.Ingredient> ingredients = info.extendedIngredients() == null ? List.of() :
            info.extendedIngredients().stream()
                .map(e -> new RecipeDetailResponse.Ingredient(e.id(), e.name(), e.original()))
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

    public RecalculateNutritionResponse recalculateCalories(long id, RecalculateNutritionRequest request) {
        SpoonacularRecipeInformation info = client.getRecipeInformation(id, false);
        int servings = info != null && info.servings() != null ? info.servings() : 1;

        Set<Long> excludeIds = request != null && request.excludeIngredientIds() != null
            ? request.excludeIngredientIds().stream().filter(Objects::nonNull).collect(Collectors.toSet())
            : Set.of();
        Set<String> excludeNamesLower = request != null && request.excludeIngredientNames() != null
            ? request.excludeIngredientNames().stream().filter(Objects::nonNull).map(s -> s.toLowerCase(Locale.ROOT)).collect(Collectors.toSet())
            : Set.of();

        List<SpoonacularRecipeInformation.ExtendedIngredient> remaining = new ArrayList<>();
        if (info != null && info.extendedIngredients() != null) {
            for (SpoonacularRecipeInformation.ExtendedIngredient e : info.extendedIngredients()) {
                boolean excludedById = e.id() != null && excludeIds.contains(e.id());
                boolean excludedByName = e.name() != null && excludeNamesLower.contains(e.name().toLowerCase(Locale.ROOT));
                if (!excludedById && !excludedByName) {
                    remaining.add(e);
                }
            }
        }

        StringBuilder ingredientList = new StringBuilder();
        for (SpoonacularRecipeInformation.ExtendedIngredient e : remaining) {
            if (e.original() != null && !e.original().isBlank()) {
                if (!ingredientList.isEmpty()) ingredientList.append("\n");
                ingredientList.append(e.original());
            }
        }

        List<SpoonacularParsedIngredient> parsed = client.parseIngredients(ingredientList.toString(), true);
        NutritionSummary nutrition = nutritionService.computeTotalsFromParsed(parsed, servings);
        RecalculateNutritionResponse.Excluded excluded = new RecalculateNutritionResponse.Excluded(
            new ArrayList<>(excludeIds),
            new ArrayList<>(excludeNamesLower)
        );
        return new RecalculateNutritionResponse(nutrition, excluded, remaining.size());
    }
}
