package com.foodaholic.api.dto.spoonacular;

public record SpoonacularParsedIngredient(
    String original,
    Double amount,
    String unit,
    String name,
    Nutrition nutrition
) {}