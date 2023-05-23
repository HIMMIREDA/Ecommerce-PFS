package com.ensa.ecommerce_backend.request;

import com.ensa.ecommerce_backend.DTO.AddressDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddOrderRequest {
    @NotEmpty
    AddressDto address;
}
