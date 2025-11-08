package com.foodaholic.api.controller;

import com.foodaholic.api.dto.request.RecipeSearchRequest;
import com.foodaholic.api.dto.response.RecipeDetailResponse;
import com.foodaholic.api.dto.response.RecipeSearchResponse;
import com.foodaholic.api.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
}