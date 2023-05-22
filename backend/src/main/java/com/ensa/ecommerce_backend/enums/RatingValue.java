package com.ensa.ecommerce_backend.enums;

import java.util.HashMap;
import java.util.Map;

public enum RatingValue {
    ONE(1),
    TWO(2),
    THREE(3),
    FOUR(4),
    FIVE(5);

    private final int value;

    private static final Map<Integer, RatingValue> map = new HashMap<>();

    private RatingValue(int value) {
        this.value = value;
    }

    static {
        for (RatingValue RatingValue : RatingValue.values()) {
            map.put(RatingValue.value, RatingValue);
        }
    }

    public static RatingValue valueOf(int RatingValue) {
        return (RatingValue) map.get(RatingValue);
    }

    public int getValue() {
        return value;
    }
}
