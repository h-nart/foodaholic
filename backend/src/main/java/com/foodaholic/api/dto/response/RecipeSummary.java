package com.foodaholic.api.dto.response;

import java.util.List;

public record RecipeSummary(
    long id,
    String title,
    String image,
    Integer readyInMinutes,
    Integer servings,
    List<String> cuisines,
    List<String> dishTypes
) {}