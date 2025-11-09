package com.foodaholic.api.controller;

import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.model.Ingredient;
import com.foodaholic.api.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origin}")
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

    @GetMapping("/{id}/calories")
    public NutritionSummary getAdjustedCalories(@PathVariable long id,
                                                @RequestParam(name = "exclude", required = false) List<Long> excludeIds) {
        RecipeDetailResponse details = recipeService.getDetails(id);
        if (details == null || details.nutrition() == null) {
            return new NutritionSummary(0, 0);
        }
        if (excludeIds == null || excludeIds.isEmpty()) {
            return details.nutrition();
        }

        Set<Long> excluded = new HashSet<>(excludeIds);
        double perServing = details.nutrition().caloriesPerServing();
        int servings = details.servings() != null ? details.servings() : 1;
        double excludedCalories = 0d;
        if (details.extendedIngredients() != null) {
            excludedCalories = details.extendedIngredients().stream()
                .filter(i -> i.getId() != null && excluded.contains(i.getId()) && i.getCalories() != null)
                .mapToDouble(Ingredient::getCalories)
                .sum();
        }
        double adjustedPerServing = perServing - excludedCalories;
        return new NutritionSummary(adjustedPerServing, adjustedPerServing * servings);
    }
}