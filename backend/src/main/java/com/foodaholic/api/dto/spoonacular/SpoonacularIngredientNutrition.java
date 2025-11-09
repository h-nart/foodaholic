package com.foodaholic.api.dto.spoonacular;

import com.foodaholic.api.model.Nutrient;

import java.util.List;

public record SpoonacularIngredientNutrition(
    Long id,
    String name,
    Double amount,
    String unit,
    List<Nutrient> nutrients
) {}
