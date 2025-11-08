package com.foodaholic.api.service;

import com.foodaholic.api.client.SpoonacularClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
class RecipeServiceCacheTest {

    @Autowired
    private RecipeService service;

    @MockitoBean
    private SpoonacularClient client;

    @Test
    void getDetails_usesCache_onSecondCall() {
        long id = 99L;

        service.getDetails(id);
        service.getDetails(id);

        verify(client, times(1)).getRecipeInformation(id, true);
    }
}


