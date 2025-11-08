package com.foodaholic.api.client;

import com.foodaholic.api.dto.request.RecipeSearchRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.*;

class SpoonacularClientTest {

    private SpoonacularFeign feign;
    private SpoonacularClient client;

    @BeforeEach
    void setUp() {
        feign = mock(SpoonacularFeign.class);
        client = new SpoonacularClient(feign);
    }

    @Test
    @DisplayName("Should pass nulls for blank fields and true booleans to SpoonacularFeign")
    void searchRecipes_passesBooleansAndNullsForBlankOptionals() {
        RecipeSearchRequest request = new RecipeSearchRequest(
            "q", "  ", "", null, " ", "", null, 30, 0, 5
        );

        client.searchRecipes(request);

        verify(feign, times(1)).complexSearch(
                eq("q"), eq(true), eq(true),
                isNull(), isNull(), isNull(), isNull(), isNull(), isNull(), eq(30), eq(0), eq(5)
        );
    }

    @Test
    void getRecipeInformation_delegatesToFeign() {
        client.getRecipeInformation(123L, true);
        verify(feign, times(1)).recipeInformation(123L, true);
    }
}
