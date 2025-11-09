package com.foodaholic.api.dto.spoonacular;

import com.foodaholic.api.model.Ingredient;

import java.util.List;

public record SpoonacularRecipeInformation(
    long id,
    String title,
    String image,
    Integer servings,
    Integer readyInMinutes,
    String summary,
    String instructions,
    List<Ingredient> extendedIngredients,
    SpoonacularNutrition nutrition
) {}
