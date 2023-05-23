package com.ensa.ecommerce_backend.web;
import com.ensa.ecommerce_backend.dto.VariationOptionDto;
import com.ensa.ecommerce_backend.request.AddVariationOptionRequest;

import com.ensa.ecommerce_backend.service.VariationOptionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/variations/options")
@AllArgsConstructor
public class VariationOptionRestController {

    VariationOptionService variationOptionService;

    @PostMapping
    public ResponseEntity<VariationOptionDto> addVariation(@RequestBody @Valid AddVariationOptionRequest addVariationOptionRequest){
        VariationOptionDto variationOptionDTO = variationOptionService.addVariationOption(addVariationOptionRequest);
        return new ResponseEntity<>(variationOptionDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVariationOption(@PathVariable("id") Long id) {
        variationOptionService.deleteVariationOption(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }
}
