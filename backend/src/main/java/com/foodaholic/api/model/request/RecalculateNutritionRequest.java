package com.foodaholic.api.model.request;

import java.util.List;

public record RecalculateNutritionRequest(
    List<Long> excludeIngredientIds,
    List<String> excludeIngredientNames
) {}