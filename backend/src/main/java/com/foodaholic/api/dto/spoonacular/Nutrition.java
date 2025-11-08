package com.foodaholic.api.dto.spoonacular;

import java.util.List;

public record Nutrition(List<Nutrient> nutrients, List<SpoonacularIngredientNutrition> ingredients) {}


