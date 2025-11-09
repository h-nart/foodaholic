package com.foodaholic.api.controller;

import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.NutritionSummary;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.dto.response.RecipeSummary;
import com.foodaholic.api.model.Ingredient;
import com.foodaholic.api.service.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class RecipeControllerTest {

    private RecipeService recipeService;
    private RecipeController controller;

    @BeforeEach
    void setup() {
        recipeService = mock(RecipeService.class);
        controller = new RecipeController(recipeService);
    }

    @Test
    void search_delegatesToService_andReturnsResponse() {
        RecipeSearchRequest request = new RecipeSearchRequest("q", null, null, null, null, null, null, null, 0, 5);
        RecipeSearchResponse response = new RecipeSearchResponse(0, 5, 1,
            List.of(new RecipeSummary(1L, "A", "img", 10, 2, List.of(), List.of())));
        when(recipeService.search(request)).thenReturn(response);

        RecipeSearchResponse result = controller.search(request);

        verify(recipeService, times(1)).search(request);
        assertThat(result).isEqualTo(response);
    }

    @Test
    void getDetails_delegatesToService_andReturnsResponse() {
        long id = 42L;
        RecipeDetailResponse response = new RecipeDetailResponse(
            id, "T", "img", 2, 15, "s", "i",
            List.of(new Ingredient(1L, "n", "o", 10d)),
            new NutritionSummary(100, 200)
        );
        when(recipeService.getDetails(id)).thenReturn(response);

        RecipeDetailResponse result = controller.getDetails(id);

        verify(recipeService, times(1)).getDetails(id);
        assertThat(result).isEqualTo(response);
    }
}
