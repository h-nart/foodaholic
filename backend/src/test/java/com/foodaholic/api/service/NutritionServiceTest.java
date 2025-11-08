package com.foodaholic.api.service;

import com.foodaholic.api.dto.spoonacular.Nutrition;
import com.foodaholic.api.dto.spoonacular.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class NutritionServiceTest {

    private final NutritionService service = new NutritionService();

    @Test
    void extractCaloriesPerServing_returnsZero_whenInfoIsNull() {
        double result = service.extractCaloriesPerServing(null);
        assertThat(result).isZero();
    }

    @Test
    void extractCaloriesPerServing_returnsZero_whenNutritionIsNull() {
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, null);
        double result = service.extractCaloriesPerServing(info);
        assertThat(result).isZero();
    }

    @Test
    void extractCaloriesPerServing_returnsZero_whenNutrientsIsNull() {
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, new Nutrition(null, null));
        double result = service.extractCaloriesPerServing(info);
        assertThat(result).isZero();
    }

    @Test
    void extractCaloriesPerServing_matchesCaloriesCaseInsensitively() {
        List<Nutrient> nutrients = List.of(
            new Nutrient("Protein", 10.0, "g"),
            new Nutrient("calories", 250.5, "kcal"),
            new Nutrient("Fat", 5.0, "g")
        );
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, new Nutrition(nutrients, null));
        double result = service.extractCaloriesPerServing(info);
        assertThat(result).isEqualTo(250.5);
    }
}
