package com.foodaholic.api.model.spoonacular;

import java.util.List;

import lombok.Data;

@Data
public class SpoonacularParsedIngredient {
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

    private String original;
    private Double amount;
    private String unit;
    private String name;
    private Nutrition nutrition;
}