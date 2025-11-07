package com.foodaholic.api.dto.request;

import java.util.List;

public record RecalculateNutritionRequest(
    List<Long> excludeIngredientIds,
    List<String> excludeIngredientNames
) {}