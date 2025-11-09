package com.foodaholic.api.dto.response;

import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;

import java.util.List;

public record RecipeSummary(
    long id,
    String title,
    String image,
    Integer readyInMinutes,
    Integer servings,
    List<String> cuisines,
    List<String> dishTypes
) {
    public RecipeSummary(SpoonacularSearchResponse.Result dto) {
        this(dto.id(), dto.title(), dto.image(), dto.readyInMinutes(), dto.servings(), dto.cuisines(), dto.dishTypes());
    }
}