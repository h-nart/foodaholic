package com.foodaholic.api.service;

import com.foodaholic.api.client.SpoonacularClient;
import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.dto.response.RecipeSummary;
import com.foodaholic.api.dto.spoonacular.*;
import com.foodaholic.api.model.Ingredient;
import com.foodaholic.api.model.Nutrient;
import com.foodaholic.api.dto.spoonacular.SpoonacularNutrition;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RecipeServiceTest {

    private SpoonacularClient client;
    private RecipeService service;

    @BeforeEach
    void setUp() {
        client = mock(SpoonacularClient.class);
        service = new RecipeService(client, new NutritionService());
    }

    @Test
    void search_returnsEmpty_whenApiResponseIsNull() {
        RecipeSearchRequest request = new RecipeSearchRequest("pizza", null, null, null, null, null, null, null, 0, 10);
        when(client.searchRecipes(request)).thenReturn(null);

        RecipeSearchResponse result = service.search(request);

        assertThat(result.offset()).isZero();
        assertThat(result.number()).isZero();
        assertThat(result.totalResults()).isZero();
        assertThat(result.results()).isEmpty();
    }

    @Test
    void search_mapsResultsCorrectly() {
        RecipeSearchRequest request = new RecipeSearchRequest("pasta", null, null, null, null, null, null, null, 0, 2);
        SpoonacularSearchResponse apiResponse = new SpoonacularSearchResponse(
            5, 2, 100,
            List.of(
                new SpoonacularSearchResponse.Result(1L, "A", "img1", 10, 2, List.of("IT"), List.of("main")),
                new SpoonacularSearchResponse.Result(2L, "B", "img2", 20, 4, List.of(), List.of("side"))
            )
        );
        when(client.searchRecipes(request)).thenReturn(apiResponse);

        RecipeSearchResponse result = service.search(request);

        assertThat(result.offset()).isEqualTo(5);
        assertThat(result.number()).isEqualTo(2);
        assertThat(result.totalResults()).isEqualTo(100);
        assertThat(result.results()).hasSize(2);
        RecipeSummary first = result.results().get(0);
        assertThat(first.id()).isEqualTo(1L);
        assertThat(first.title()).isEqualTo("A");
        assertThat(first.image()).isEqualTo("img1");
        assertThat(first.readyInMinutes()).isEqualTo(10);
        assertThat(first.servings()).isEqualTo(2);
        assertThat(first.cuisines()).containsExactly("IT");
        assertThat(first.dishTypes()).containsExactly("main");
    }

    @Test
    void getDetails_returnsDefaults_whenInfoIsNull() {
        when(client.getRecipeInformation(42L, true)).thenReturn(null);

        RecipeDetailResponse result = service.getDetails(42L);

        assertThat(result.id()).isZero();
        assertThat(result.title()).isNull();
        assertThat(result.image()).isNull();
        assertThat(result.servings()).isNull();
        assertThat(result.readyInMinutes()).isNull();
        assertThat(result.summary()).isNull();
        assertThat(result.instructions()).isNull();
        assertThat(result.extendedIngredients()).isEmpty();
        assertThat(result.nutrition()).isEqualTo(new NutritionSummary(0, 0));
    }

    @Test
    void getDetails_mapsIngredientCalories_byIdAndName_fallbacks() {
        List<SpoonacularIngredientNutrition> ingredientsNutrition = List.of(
            new SpoonacularIngredientNutrition(100L, "Apple", null, null,
                List.of(new Nutrient("Calories", 123.0, "kcal"))),
            new SpoonacularIngredientNutrition(null, "Banana", null, null,
                List.of(new Nutrient("Calories", 45.0, "kcal")))
        );
        SpoonacularNutrition nutrition = new SpoonacularNutrition(
            List.of(new Nutrient("Calories", 200.0, "kcal")),
            ingredientsNutrition
        );
        SpoonacularRecipeInformation info = new SpoonacularRecipeInformation(
            10L, "T", "img", 2, 15, "s", "i",
            List.of(
                new Ingredient(100L, "Apple", "orig1", null),
                new Ingredient(null, "BANANA", "orig2", null),
                new Ingredient(999L, "Unknown", "orig3", null)
            ),
            nutrition
        );
        when(client.getRecipeInformation(10L, true)).thenReturn(info);

        RecipeDetailResponse result = service.getDetails(10L);

        assertThat(result.extendedIngredients()).hasSize(3);
        assertThat(result.extendedIngredients().get(0).getCalories()).isEqualTo(123.0);
        assertThat(result.extendedIngredients().get(1).getCalories()).isEqualTo(45.0);
        assertThat(result.extendedIngredients().get(2).getCalories()).isNull();
        assertThat(result.nutrition()).isEqualTo(new NutritionSummary(200.0, 400.0));
    }

    @Test
    void getDetails_usesServingsFallbackToOne_whenNull() {
        SpoonacularNutrition nutrition = new SpoonacularNutrition(
            List.of(new Nutrient("Calories", 50.0, "kcal")),
            List.of()
        );
        SpoonacularRecipeInformation info = new SpoonacularRecipeInformation(
            11L, "T", "img", null, 10, "s", "i",
            List.of(), nutrition
        );
        when(client.getRecipeInformation(11L, true)).thenReturn(info);

        RecipeDetailResponse result = service.getDetails(11L);

        assertThat(result.nutrition()).isEqualTo(new NutritionSummary(50.0, 50.0));
    }
}
