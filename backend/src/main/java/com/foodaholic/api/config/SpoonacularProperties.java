package com.foodaholic.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;

@Validated
@ConfigurationProperties(prefix = "spoonacular")
public record SpoonacularProperties(
    @NotBlank String baseUrl,
    @NotBlank String apiKey,
    int connectTimeoutMs,
    int readTimeoutMs
) {
    public SpoonacularProperties {
        if (connectTimeoutMs == 0) connectTimeoutMs = 5000;
        if (readTimeoutMs == 0) readTimeoutMs = 10000;
    }
}