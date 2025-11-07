package com.foodaholic.api.model.spoonacular;

import java.util.List;

public record SpoonacularRecipeInformation(
    long id,
    String title,
    String image,
    Integer servings,
    Integer readyInMinutes,
    String summary,
    String instructions,
    List<ExtendedIngredient> extendedIngredients,
    Nutrition nutrition
) {
    public record ExtendedIngredient(Long id, String name, String original) {}
}