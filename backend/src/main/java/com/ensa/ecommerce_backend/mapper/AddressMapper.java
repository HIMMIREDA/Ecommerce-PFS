package com.ensa.ecommerce_backend.mapper;


import com.ensa.ecommerce_backend.DTO.AddressDto;
import com.ensa.ecommerce_backend.entity.AddressEntity;
import org.springframework.beans.BeanUtils;

public class AddressMapper {
    public static AddressDto mapAddressToAddressDto(AddressEntity addressEntity){
        AddressDto addressDto = new AddressDto();
        BeanUtils.copyProperties(addressEntity,addressDto);
        return addressDto;
    }
}
