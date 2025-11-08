package com.foodaholic.api.client;

import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class SpoonacularClient {

    private final SpoonacularFeign feign;

    public SpoonacularSearchResponse searchRecipes(RecipeSearchRequest request) {
        return feign.complexSearch(
            request.query(),
            true,
            true,
            StringUtils.hasText(request.diet()) ? request.diet() : null,
            StringUtils.hasText(request.intolerances()) ? request.intolerances() : null,
            StringUtils.hasText(request.cuisine()) ? request.cuisine() : null,
            StringUtils.hasText(request.includeIngredients()) ? request.includeIngredients() : null,
            StringUtils.hasText(request.excludeIngredients()) ? request.excludeIngredients() : null,
            StringUtils.hasText(request.type()) ? request.type() : null,
            request.maxReadyTime(),
            request.offset(),
            request.number()
        );
    }

    public SpoonacularRecipeInformation getRecipeInformation(long id, boolean includeNutrition) {
        return feign.recipeInformation(id, includeNutrition);
    }
}