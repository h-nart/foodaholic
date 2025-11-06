package com.foodaholic.api.model.request;

import lombok.Data;

@Data
public class RecipeSearchRequest {
    private String query;
    private String diet;
    private String intolerances; // comma-separated as Spoonacular expects
    private String cuisine;
    private String includeIngredients; // comma-separated
    private String excludeIngredients; // comma-separated
    private String type;
    private Integer maxReadyTime;
    private Integer offset;
    private Integer number;
}