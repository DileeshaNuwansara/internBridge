package com.internbridge.internbridge_backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ScNumberValidator implements ConstraintValidator<ValidScNumber, String> {
    private static final String SC_NUMBER_PATTERN = "^SC/\\d{4}/\\d{5}$";


    @Override
    public boolean isValid(String scNumber, ConstraintValidatorContext context) {
        if (scNumber == null) {
            return false; // or true if null values are acceptable
        }
        return scNumber.matches(SC_NUMBER_PATTERN);
    }


}
