package com.foodaholic.api.dto.spoonacular;

import java.util.List;

public record SpoonacularIngredientNutrition(
    Long id,
    String name,
    Double amount,
    String unit,
    List<Nutrient> nutrients
) {}
