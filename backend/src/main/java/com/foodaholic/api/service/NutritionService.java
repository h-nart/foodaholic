package com.foodaholic.api.service;

import java.util.List;

import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.spoonacular.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularParsedIngredient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import org.springframework.stereotype.Service;

@Service
public class NutritionService {

    public double extractCaloriesPerServing(SpoonacularRecipeInformation info) {
        if (info == null || info.nutrition() == null || info.nutrition().nutrients() == null) return 0d;
        return info.nutrition().nutrients().stream()
            .filter(n -> "Calories".equalsIgnoreCase(n.name()))
            .mapToDouble(Nutrient::amount)
            .findFirst()
            .orElse(0d);
    }

    public NutritionSummary computeTotalsFromParsed(List<SpoonacularParsedIngredient> parsed, int servings) {
        double total = 0d;
        if (parsed != null) {
            for (SpoonacularParsedIngredient item : parsed) {
                if (item.nutrition() == null || item.nutrition().nutrients() == null) continue;
                total += item.nutrition().nutrients().stream()
                    .filter(n -> "Calories".equalsIgnoreCase(n.name()))
                    .mapToDouble(Nutrient::amount)
                    .sum();
            }
        }
        double perServing = servings > 0 ? total / servings : total;
        return new NutritionSummary(perServing, total);
    }
}