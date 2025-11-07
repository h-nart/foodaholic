package com.foodaholic.api.model.response;

import java.util.List;

public record RecipeSearchResponse(
    int offset,
    int number,
    int totalResults,
    List<RecipeSummary> results
) {}