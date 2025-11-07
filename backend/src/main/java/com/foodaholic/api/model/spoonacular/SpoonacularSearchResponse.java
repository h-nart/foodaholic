package com.foodaholic.api.model.spoonacular;

import java.util.List;

public record SpoonacularSearchResponse(
    int offset,
    int number,
    int totalResults,
    List<Result> results
) {
    public record Result(
        long id,
        String title,
        String image,
        Integer readyInMinutes,
        Integer servings,
        List<String> cuisines,
        List<String> dishTypes
    ) {}
}