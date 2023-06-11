package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.dto.AddressDto;
import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.exception.CartTotalMismatchException;
import com.ensa.ecommerce_backend.exception.ProductNotFoundException;
import com.ensa.ecommerce_backend.exception.ProductQuantityException;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.repository.OrderRepository;
import com.ensa.ecommerce_backend.repository.UserRepository;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.response.CreatePaymentIntentResponse;
import com.ensa.ecommerce_backend.service.CartService;
import com.ensa.ecommerce_backend.service.OrderService;
import com.ensa.ecommerce_backend.service.ProductService;
import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.net.Webhook;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.RefundCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StripeServiceImpl implements StripeService {
    private final CartService cartService;
    private final CartRepository cartRepository;
    private final OrderService orderService;
    private final ProductService productService;
    @Value("${stripe.secret_key}")
    private String STRIPE_SECRET_KEY;
    @Value("${stripe.webhook_secret_key}")
    private String STRIPE_WEBHOOK_SECRET;

    @Autowired
    public StripeServiceImpl(CartService cartService, CartRepository cartRepository, OrderService orderService, ProductService productService) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
        this.orderService = orderService;
        this.productService = productService;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = STRIPE_SECRET_KEY;
    }

    @Override
    public CreatePaymentIntentResponse createPaymentIntent(AddressDto addressDto) throws StripeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CartEntity cart = cartRepository.findCartEntityByUserEmail(authentication.getName()).orElseThrow();
        if (cartService.getCartTotal() != cart.getTotal() || cart.getTotal() == 0) {
            throw new CartTotalMismatchException("There is a discrepancy in the cart total. Please review your order and try again.");
        }

        CustomerCreateParams.Address address = CustomerCreateParams.Address.builder()
                .setCity(addressDto.getCity())
                .setCountry(addressDto.getCountry())
                .setLine1(addressDto.getAddressLine())
                .setPostalCode(addressDto.getPostalCode().toString())
                .build();
        CustomerCreateParams customerParams = CustomerCreateParams.builder()
                .setAddress(address)
                .setEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .build();
        Customer customer = Customer.create(customerParams);


        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) cart.getTotal())
                .setCurrency("usd")
                .setCustomer(customer.getId())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                )
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return CreatePaymentIntentResponse.builder()
                .clientSecret(paymentIntent.getClientSecret())
                .build();
    }

    public boolean verifyWebhookEvent(String payload, String signatureHeader) {
        try {
            Event event = Webhook.constructEvent(payload, signatureHeader, STRIPE_WEBHOOK_SECRET);
            return event.getId() != null;
        } catch (SignatureVerificationException e) {
            return false;
        }
    }

    public Event parseWebhookEvent(String payload) {
        try {
            return Event.PRETTY_PRINT_GSON.fromJson(payload, Event.class);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean handleWebHookEvent(String payload, String sigHeader) throws StripeException {
        if (!verifyWebhookEvent(payload, sigHeader)) {
            return false;
        }

        Event event = parseWebhookEvent(payload);
        if (event == null) {
            return false;
        }
        System.out.println(event);
        // Handle the event based on its type
        switch (event.getType()) {
            case "payment_intent.succeeded" -> handlePaymentSucceeded(event);
            case "payment_intent.payment_failed" -> handlePaymentFailed(event);
        }

        return true;
    }


    public void handlePaymentSucceeded(Event event) throws StripeException {
        PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);

        if (paymentIntent != null) {
            Customer customer = Customer.retrieve(paymentIntent.getCustomer());
            AddOrderRequest addOrderRequest = new AddOrderRequest(
                    AddressDto.builder()
                            .city(customer.getAddress().getCity())
                            .addressLine(customer.getAddress().getLine1())
                            .postalCode(Long.parseLong(customer.getAddress().getPostalCode()))
                            .country(customer.getAddress().getCountry())
                            .build()
            );

            orderService.addOrder(paymentIntent.getId(), addOrderRequest, customer.getEmail());
            CartEntity cart = cartRepository.findCartEntityByUserEmail(customer.getEmail()).orElseThrow();
            try {
                productService.reduceProductsQuantity(cart);
                orderService.updateOrderStatus(paymentIntent.getId(), OrderStatus.PAID);
            } catch (ProductNotFoundException | ProductQuantityException exception) {
                refundPayment(paymentIntent.getId());
            } finally {
                cart.getCartItems().clear();
                cartRepository.save(cart);
            }
        }

    }

    public void handlePaymentFailed(Event event) throws StripeException {
        PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);

        if (paymentIntent != null) {
            Customer customer = Customer.retrieve(paymentIntent.getCustomer());
            AddOrderRequest addOrderRequest = new AddOrderRequest(
                    AddressDto.builder()
                            .city(customer.getAddress().getCity())
                            .addressLine(customer.getAddress().getLine1())
                            .postalCode(Long.parseLong(customer.getAddress().getPostalCode()))
                            .country(customer.getAddress().getCountry())
                            .build()
            );

            CartEntity cart = cartRepository.findCartEntityByUserEmail(customer.getEmail()).orElseThrow();
            orderService.addOrder(paymentIntent.getId(), addOrderRequest, customer.getEmail());
            orderService.updateOrderStatus(paymentIntent.getId(), OrderStatus.PAYMENT_FAILED);
            cart.getCartItems().clear();
            cartRepository.save(cart);
        }
    }

    public void refundPayment(String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

        // Check if the PaymentIntent is in a refundable state
        if (paymentIntent.getStatus().equals("succeeded")) {
            // Create a refund for the PaymentIntent
            RefundCreateParams refundParams = RefundCreateParams.builder()
                    .setPaymentIntent(paymentIntentId)
                    .build();

            Refund refund = Refund.create(refundParams);

            orderService.updateOrderStatus(paymentIntent.getId(), OrderStatus.CANCELED);

            // Log the successful refund
            System.out.println("Payment refunded successfully");
        }
    }

}
