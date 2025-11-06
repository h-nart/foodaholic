package com.foodaholic.api.model.spoonacular;

import java.util.List;

import lombok.Data;

@Data
public class SpoonacularRecipeInformation {
    @Data
    public static class Nutrient {
        private String name;
        private double amount;
        private String unit;
    }

    @Data
    public static class Nutrition {
        private List<Nutrient> nutrients;
    }

    @Data
    public static class ExtendedIngredient {
        private Long id;
        private String name;
        private String original;
    }

    private long id;
    private String title;
    private String image;
    private Integer servings;
    private Integer readyInMinutes;
    private String summary;
    private String instructions;
    private List<ExtendedIngredient> extendedIngredients;
    private Nutrition nutrition;
}