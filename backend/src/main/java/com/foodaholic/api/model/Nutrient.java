package com.foodaholic.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nutrient {
    private String name;
    private double amount;
    private String unit;
}
