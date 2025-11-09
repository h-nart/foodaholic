package com.foodaholic.api.service;

import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.spoonacular.SpoonacularNutrition;
import com.foodaholic.api.model.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SpoonacularNutritionServiceTest {

    private final NutritionService service = new NutritionService();

    @Test
    void extractNutritionSummary_returnsZero_whenInfoIsNull() {
        NutritionSummary result = service.extractNutritionSummary(null);
        assertThat(result).isEqualTo(new NutritionSummary(0, 0));
    }

    @Test
    void extractNutritionSummary_returnsZero_whenNutritionIsNull() {
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, null);
        NutritionSummary result = service.extractNutritionSummary(info);
        assertThat(result).isEqualTo(new NutritionSummary(0, 0));
    }

    @Test
    void extractNutritionSummary_returnsZero_whenNutrientsIsNull() {
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, new SpoonacularNutrition(null, null));
        NutritionSummary result = service.extractNutritionSummary(info);
        assertThat(result).isEqualTo(new NutritionSummary(0, 0));
    }

    @Test
    void extractCaloriesPerServing_matchesCaloriesCaseInsensitively() {
        List<Nutrient> nutrients = List.of(
            new Nutrient("Protein", 10.0, "g"),
            new Nutrient("calories", 250.5, "kcal"),
            new Nutrient("Fat", 5.0, "g")
        );
        SpoonacularRecipeInformation info =
            new SpoonacularRecipeInformation(1L, null, null, null, null, null, null, null, new SpoonacularNutrition(nutrients, null));
        NutritionSummary result = service.extractNutritionSummary(info);
        assertThat(result).isEqualTo(new NutritionSummary(250.5, 250.5));
    }
}
