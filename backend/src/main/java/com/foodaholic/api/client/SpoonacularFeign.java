package com.foodaholic.api.client;

import java.util.List;

import com.foodaholic.api.dto.spoonacular.SpoonacularParsedIngredient;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.foodaholic.api.config.SpoonacularFeignConfig;

@FeignClient(name = "spoonacular", url = "${spoonacular.base-url}", configuration = SpoonacularFeignConfig.class)
public interface SpoonacularFeign {

    @GetMapping("/recipes/complexSearch")
    SpoonacularSearchResponse complexSearch(@RequestParam String query,
                                            @RequestParam boolean addRecipeInformation,
                                            @RequestParam boolean instructionsRequired,
                                            @RequestParam(required = false) String diet,
                                            @RequestParam(required = false) String intolerances,
                                            @RequestParam(required = false) String cuisine,
                                            @RequestParam(required = false) String includeIngredients,
                                            @RequestParam(required = false) String excludeIngredients,
                                            @RequestParam(required = false) String type,
                                            @RequestParam(required = false) Integer maxReadyTime,
                                            @RequestParam(required = false) Integer offset,
                                            @RequestParam(required = false) Integer number);

    @GetMapping("/recipes/{id}/information")
    SpoonacularRecipeInformation recipeInformation(@PathVariable long id, @RequestParam boolean includeNutrition);

    @PostMapping(value = "/recipes/parseIngredients", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    List<SpoonacularParsedIngredient> parseIngredients(@RequestParam boolean includeNutrition,
                                                       @RequestParam int servings,
                                                       @RequestBody String form);
}