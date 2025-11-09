package com.foodaholic.api.dto.response;

import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.model.Ingredient;

import java.util.List;

public record RecipeDetailResponse(
    long id,
    String title,
    String image,
    Integer servings,
    Integer readyInMinutes,
    String summary,
    String instructions,
    List<Ingredient> extendedIngredients,
    NutritionSummary nutrition
) {
    public RecipeDetailResponse(SpoonacularRecipeInformation info, NutritionSummary nutrition) {
        this (
                info.id(),
                info.title(),
                info.image(),
                info.servings(),
                info.readyInMinutes(),
                info.summary(),
                info.instructions(),
                info.extendedIngredients(),
                nutrition
        );
    }
}