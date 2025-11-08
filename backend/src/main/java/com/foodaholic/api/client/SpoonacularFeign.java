package com.foodaholic.api.client;

import com.foodaholic.api.config.SpoonacularFeignConfig;
import com.foodaholic.api.dto.spoonacular.SpoonacularRecipeInformation;
import com.foodaholic.api.dto.spoonacular.SpoonacularSearchResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "spoonacular", url = "${spoonacular.base-url}", configuration = SpoonacularFeignConfig.class)
public interface SpoonacularFeign {

    @GetMapping("/recipes/complexSearch")
    SpoonacularSearchResponse complexSearch(@RequestParam String query,
                                            @RequestParam(required = false) boolean addRecipeInformation,
                                            @RequestParam(required = false) boolean instructionsRequired,
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
}