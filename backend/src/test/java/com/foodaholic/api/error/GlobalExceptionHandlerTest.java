package com.foodaholic.api.error;

import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.client.RestClientResponseException;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleRestClient_usesStatusFromException() {
        RestClientResponseException ex = new RestClientResponseException(
            "msg", 404, "Not Found", new HttpHeaders(),
            "{\"error\":\"nf\"}".getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8
        );

        ResponseEntity<Map<String, Object>> resp = handler.handleRestClient(ex);
        assertThat(resp.getStatusCode().value()).isEqualTo(404);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().get("status")).isEqualTo(404);
    }

    @Test
    void handleRestClient_fallsBackToBadGatewayForUnknownStatus() {
        RestClientResponseException ex = new RestClientResponseException(
            "msg", 599, "Unknown", new HttpHeaders(),
            "x".getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8
        );

        ResponseEntity<Map<String, Object>> resp = handler.handleRestClient(ex);
        assertThat(resp.getStatusCode().value()).isEqualTo(502);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().get("status")).isEqualTo(502);
    }

    static class Dummy {
        @SuppressWarnings("unused")
        void m(String s) {}
    }

    @Test
    void handleValidation_returnsBadRequest() throws NoSuchMethodException {
        BindingResult bindingResult = new BeanPropertyBindingResult(new Object(), "obj");
        MethodParameter parameter = new MethodParameter(Dummy.class.getDeclaredMethod("m", String.class), 0);
        MethodArgumentNotValidException ex = new MethodArgumentNotValidException(parameter, bindingResult);

        ResponseEntity<Map<String, Object>> resp = handler.handleValidation(ex);
        assertThat(resp.getStatusCode().value()).isEqualTo(400);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().get("status")).isEqualTo(400);
    }

    @Test
    void handleGeneric_returnsInternalServerError() {
        Exception ex = new Exception("oops");
        ResponseEntity<Map<String, Object>> resp = handler.handleGeneric(ex);
        assertThat(resp.getStatusCode().value()).isEqualTo(500);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().get("status")).isEqualTo(500);
    }
}
