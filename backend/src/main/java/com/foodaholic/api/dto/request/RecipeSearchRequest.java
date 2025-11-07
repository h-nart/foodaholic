package com.foodaholic.api.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record RecipeSearchRequest(
    @NotBlank String query,
    String diet,
    String intolerances,
    String cuisine,
    String includeIngredients,
    String excludeIngredients,
    String type,
    @Min(1) Integer maxReadyTime,
    @Min(0) @Max(900) Integer offset,
    @Min(1) @Max(100) Integer number
) {}