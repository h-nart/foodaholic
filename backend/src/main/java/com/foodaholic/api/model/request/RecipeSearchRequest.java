package com.foodaholic.api.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RecipeSearchRequest {
    @NotBlank
    private String query;
    private String diet;
    private String intolerances;
    private String cuisine;
    private String includeIngredients;
    private String excludeIngredients;
    private String type;
    @Min(1)
    private Integer maxReadyTime;
    @Min(0)
    @Max(900)
    private Integer offset = 0;
    @Min(1)
    @Max(100)
    private Integer number = 10;
}