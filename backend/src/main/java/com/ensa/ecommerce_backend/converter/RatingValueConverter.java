package com.ensa.ecommerce_backend.converter;

import com.ensa.ecommerce_backend.enums.RatingValue;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class RatingValueConverter implements AttributeConverter<RatingValue, Integer> {
    @Override
    public Integer convertToDatabaseColumn(RatingValue value) {
        if (value == null) {
            return null;
        }
        return value.getValue();
    }

    @Override
    public RatingValue convertToEntityAttribute(Integer integer) {

        return RatingValue.valueOf(integer);

    }

}
