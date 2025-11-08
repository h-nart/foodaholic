package com.foodaholic.api.dto.response;

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
    public record Ingredient(Long id, String name, String original, Double calories) {}
}