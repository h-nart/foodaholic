package com.foodaholic.api.model.spoonacular;

public record SpoonacularParsedIngredient(
    String original,
    Double amount,
    String unit,
    String name,
    Nutrition nutrition
) {}