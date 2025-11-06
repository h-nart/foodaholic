package com.foodaholic.api;

import com.foodaholic.api.config.SpoonacularProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableConfigurationProperties(SpoonacularProperties.class)
public class FoodaholicApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodaholicApplication.class, args);
    }

}
