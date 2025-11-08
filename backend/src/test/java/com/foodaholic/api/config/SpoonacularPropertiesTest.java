package com.foodaholic.api.config;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class SpoonacularPropertiesTest {

    @Test
    void defaultsApplied_whenTimeoutsAreZero() {
        SpoonacularProperties props = new SpoonacularProperties("https://x", "key", 0, 0);
        assertThat(props.connectTimeoutMs()).isEqualTo(5000);
        assertThat(props.readTimeoutMs()).isEqualTo(10000);
    }

    @Test
    void notBlankValidation_forBaseUrlAndApiKey() {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        SpoonacularProperties invalid = new SpoonacularProperties("", "", 100, 100);
        Set<ConstraintViolation<SpoonacularProperties>> violations = validator.validate(invalid);
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("baseUrl"));
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("apiKey"));
    }
}
