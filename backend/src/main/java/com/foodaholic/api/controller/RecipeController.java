package com.foodaholic.api.controller;

import com.foodaholic.api.model.request.RecalculateNutritionRequest;
import com.foodaholic.api.model.request.RecipeSearchRequest;
import com.foodaholic.api.model.response.RecalculateNutritionResponse;
import com.foodaholic.api.model.response.RecipeDetailResponse;
import com.foodaholic.api.model.response.RecipeSearchResponse;
import com.foodaholic.api.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
@Validated
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/search")
    public RecipeSearchResponse search(@Valid @ModelAttribute RecipeSearchRequest request) {
        return recipeService.search(request);
    }

    @GetMapping("/{id}")
    public RecipeDetailResponse getDetails(@PathVariable long id) {
        return recipeService.getDetails(id);
    }

    @PostMapping("/{id}/nutrition/recalculate")
    public RecalculateNutritionResponse recalculate(@PathVariable long id,
                                                    @RequestBody RecalculateNutritionRequest request) {
        return recipeService.recalculateCalories(id, request);
    }
}