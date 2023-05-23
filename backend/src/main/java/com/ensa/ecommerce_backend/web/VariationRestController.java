package com.ensa.ecommerce_backend.web;

import com.ensa.ecommerce_backend.dto.VariationDto;
import com.ensa.ecommerce_backend.request.AddVariationRequest;
import com.ensa.ecommerce_backend.service.VariationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/variations")
@AllArgsConstructor
public class VariationRestController {

    VariationService variationService;

    @PostMapping
    public ResponseEntity<VariationDto> addVariation(@RequestBody @Valid AddVariationRequest addVariationRequest){
        VariationDto variationDTO = variationService.addVariation(addVariationRequest);
        return new ResponseEntity<>(variationDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVariation(@PathVariable("id") Long id) {
        variationService.deleteVariation(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VariationDto> getVariationById(@PathVariable Long id) {
        return ResponseEntity.ok(variationService.getVariationById(id));
    }
}
