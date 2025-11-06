package com.foodaholic.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SpoonacularFeignConfig {

    private final SpoonacularProperties properties;

    @Bean
    public RequestInterceptor apiKeyQueryParamInterceptor() {
        return template -> template.query("apiKey", properties.apiKey());
    }
}