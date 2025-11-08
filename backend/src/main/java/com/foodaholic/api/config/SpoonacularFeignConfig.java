package com.foodaholic.api.config;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class SpoonacularFeignConfig {

    private final SpoonacularProperties properties;

    @Bean
    public RequestInterceptor apiKeyQueryParamInterceptor() {
        return template -> template.query("apiKey", properties.apiKey());
    }
}