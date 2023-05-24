package com.ensa.ecommerce_backend.web;


import com.ensa.ecommerce_backend.entity.OrderEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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


    /*
    @PostMapping
    public ResponseEntity<OrderEntity> addOrder(@RequestBody AddOrderRequest addOrderRequest) {
        OrderEntity order = orderService.addOrder(addOrderRequest);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable("id") String id) {
        orderService.deleteOrderById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable String id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderEntity>> getOrders(){
        return ResponseEntity.ok(orderService.getAuthenticatedUserOrders());
    }

    /*
    @PutMapping("/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable("id") String id, @RequestBody OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
     */

}
