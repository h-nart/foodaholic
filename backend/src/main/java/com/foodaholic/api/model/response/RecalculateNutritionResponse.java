package com.foodaholic.api.model.response;

import java.util.List;

public record RecalculateNutritionResponse(
    NutritionSummary nutrition,
    Excluded excluded,
    int includedCount
) {
    public record Excluded(List<Long> ids, List<String> names) {}
}