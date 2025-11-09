package com.foodaholic.api.service;

import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.spoonacular.SpoonacularIngredientNutrition;
import com.foodaholic.api.model.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class NutritionService {

    public NutritionSummary extractNutritionSummary(SpoonacularRecipeInformation info) {
        if (info == null || info.nutrition() == null) return new NutritionSummary(0, 0);
        double calories = getCaloriesPerServing(info.nutrition().nutrients());
        int servings = info.servings() != null ? info.servings() : 1;
        return new NutritionSummary(calories, calories * servings);
    }

    public void updateIngredientsCalories(SpoonacularRecipeInformation info) {
        if (info.nutrition() == null || info.nutrition().ingredients() == null)
            return;
        HashMap<Long, Double> caloriesById = new HashMap<>();
        for (SpoonacularIngredientNutrition ingredientNutrition : info.nutrition().ingredients()) {
            double calories = getCaloriesPerServing(ingredientNutrition.nutrients());
            caloriesById.put(ingredientNutrition.id(), calories);
        }
        info.extendedIngredients().forEach(ingredient -> ingredient.setCalories(caloriesById.get(ingredient.getId())));
    }

    public double getCaloriesPerServing(List<Nutrient> nutrients) {
        if (nutrients == null) return 0d;
        return nutrients.stream().filter(n -> "Calories".equalsIgnoreCase(n.getName()))
                .mapToDouble(Nutrient::getAmount).findFirst().orElse(0d);
    }
}