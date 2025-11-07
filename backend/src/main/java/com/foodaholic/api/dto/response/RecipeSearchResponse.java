package com.foodaholic.api.dto.response;

import java.util.List;

public record RecipeSearchResponse(
    int offset,
    int number,
    int totalResults,
    List<RecipeSummary> results
) {}