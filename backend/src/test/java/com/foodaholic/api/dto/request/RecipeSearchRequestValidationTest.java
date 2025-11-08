package com.foodaholic.api.dto.request;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class RecipeSearchRequestValidationTest {

    private static Validator validator;

    @BeforeAll
    static void init() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    void query_mustNotBeBlank() {
        RecipeSearchRequest req = new RecipeSearchRequest("   ", null, null, null, null, null, null, null, 0, 10);
        Set<ConstraintViolation<RecipeSearchRequest>> violations = validator.validate(req);
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("query"));
    }

    @Test
    void offset_mustBeWithinRange() {
        RecipeSearchRequest negative = new RecipeSearchRequest("q", null, null, null, null, null, null, null, -1, 10);
        Set<ConstraintViolation<RecipeSearchRequest>> v1 = validator.validate(negative);
        assertThat(v1).anyMatch(v -> v.getPropertyPath().toString().equals("offset"));

        RecipeSearchRequest tooLarge = new RecipeSearchRequest("q", null, null, null, null, null, null, null, 1000, 10);
        Set<ConstraintViolation<RecipeSearchRequest>> v2 = validator.validate(tooLarge);
        assertThat(v2).anyMatch(v -> v.getPropertyPath().toString().equals("offset"));
    }

    @Test
    void number_mustBeWithinRange() {
        RecipeSearchRequest tooSmall = new RecipeSearchRequest("q", null, null, null, null, null, null, null, 0, 0);
        Set<ConstraintViolation<RecipeSearchRequest>> v1 = validator.validate(tooSmall);
        assertThat(v1).anyMatch(v -> v.getPropertyPath().toString().equals("number"));

        RecipeSearchRequest tooBig = new RecipeSearchRequest("q", null, null, null, null, null, null, null, 0, 101);
        Set<ConstraintViolation<RecipeSearchRequest>> v2 = validator.validate(tooBig);
        assertThat(v2).anyMatch(v -> v.getPropertyPath().toString().equals("number"));
    }

    @Test
    void maxReadyTime_minIsOne_whenProvided() {
        RecipeSearchRequest invalid = new RecipeSearchRequest("q", null, null, null, null, null, null, 0, 0, 10);
        Set<ConstraintViolation<RecipeSearchRequest>> v = validator.validate(invalid);
        assertThat(v).anyMatch(vi -> vi.getPropertyPath().toString().equals("maxReadyTime"));
    }
}
