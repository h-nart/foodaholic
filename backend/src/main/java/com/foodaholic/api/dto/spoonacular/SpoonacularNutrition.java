package com.foodaholic.api.dto.spoonacular;

import com.foodaholic.api.model.Nutrient;

import java.util.List;

public record SpoonacularNutrition(List<Nutrient> nutrients, List<SpoonacularIngredientNutrition> ingredients) {}
