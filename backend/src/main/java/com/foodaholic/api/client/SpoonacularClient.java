package com.foodaholic.api.client;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import com.foodaholic.api.model.request.RecipeSearchRequest;
import com.foodaholic.api.model.spoonacular.SpoonacularParsedIngredient;
import com.foodaholic.api.model.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.model.spoonacular.SpoonacularSearchResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SpoonacularClient {

    private final SpoonacularFeign feign;

    public SpoonacularSearchResponse searchRecipes(RecipeSearchRequest request) {
        return feign.complexSearch(
            request.getQuery(),
            true,
            true,
            StringUtils.hasText(request.getDiet()) ? request.getDiet() : null,
            StringUtils.hasText(request.getIntolerances()) ? request.getIntolerances() : null,
            StringUtils.hasText(request.getCuisine()) ? request.getCuisine() : null,
            StringUtils.hasText(request.getIncludeIngredients()) ? request.getIncludeIngredients() : null,
            StringUtils.hasText(request.getExcludeIngredients()) ? request.getExcludeIngredients() : null,
            StringUtils.hasText(request.getType()) ? request.getType() : null,
            request.getMaxReadyTime(),
            request.getOffset(),
            request.getNumber()
        );
    }

    public SpoonacularRecipeInformation getRecipeInformation(long id, boolean includeNutrition) {
        return feign.recipeInformation(id, includeNutrition);
    }

    public List<SpoonacularParsedIngredient> parseIngredients(String ingredientList, boolean includeNutrition) {
        String body = "ingredientList=" + URLEncoder.encode(ingredientList, StandardCharsets.UTF_8);
        return feign.parseIngredients(includeNutrition, 1, body);
    }
}