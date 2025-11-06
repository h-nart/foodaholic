package com.foodaholic.api.model.spoonacular;

import java.util.List;

import lombok.Data;

@Data
public class SpoonacularSearchResponse {
    @Data
    public static class Result {
        private long id;
        private String title;
        private String image;
        private Integer readyInMinutes;
        private Integer servings;
        private List<String> cuisines;
        private List<String> dishTypes;
    }

    private int offset;
    private int number;
    private int totalResults;
    private List<Result> results;
}