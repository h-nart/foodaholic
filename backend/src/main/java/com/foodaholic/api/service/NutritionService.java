package com.foodaholic.api.service;

import com.foodaholic.api.dto.spoonacular.Nutrient;
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
}