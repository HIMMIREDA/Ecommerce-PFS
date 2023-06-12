package com.ensa.ecommerce_backend.web;


import com.ensa.ecommerce_backend.dto.OrderDto;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.request.UpdateOrderRequest;
import com.ensa.ecommerce_backend.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderRestController {
    OrderService orderService;


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable("id") String id) {
        orderService.deleteOrderById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAuthenticatedUserOrders() {
        return ResponseEntity.ok(orderService.getAuthenticatedUserOrders());
    }


    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable("id") String id, @RequestBody UpdateOrderRequest updateOrderRequest) {
        OrderStatus orderStatus = updateOrderRequest.getStatus();

        return ResponseEntity.ok(orderService.updateOrderStatus(id, orderStatus));
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

}
