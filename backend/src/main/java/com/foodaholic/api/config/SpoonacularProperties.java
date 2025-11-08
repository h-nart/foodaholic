package com.foodaholic.api.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

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