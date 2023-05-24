package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.DTO.AddressDto;
import com.ensa.ecommerce_backend.entity.CartEntity;
import com.ensa.ecommerce_backend.enums.OrderStatus;
import com.ensa.ecommerce_backend.exception.CartTotalMismatchException;
import com.ensa.ecommerce_backend.repository.CartRepository;
import com.ensa.ecommerce_backend.request.AddOrderRequest;
import com.ensa.ecommerce_backend.response.CreatePaymentIntentResponse;
import com.ensa.ecommerce_backend.service.CartService;
import com.ensa.ecommerce_backend.service.OrderService;
import com.ensa.ecommerce_backend.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
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
    @Value("${stripe.secret_key}")
    private String STRIPE_SECRET_KEY;
    @Value("${stripe.webhook_secret_key}")
    private String STRIPE_WEBHOOK_SECRET;

    @Autowired
    public StripeServiceImpl(CartService cartService, CartRepository cartRepository, OrderService orderService) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
        this.orderService = orderService;
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
        // Handle the event based on its type
        switch (event.getType()) {
            case "payment_intent.processing" -> System.out.println("payment processing");
            case "payment_intent.succeeded" -> handlePaymentSucceeded(event);
            case "payment_intent.payment_failed" -> System.out.println("payment failed");
        }

        return true;
    }

    public void handlePaymentProcessing(Event event) throws StripeException {
        PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);

        System.out.println(paymentIntent);
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
        }
    }

    public void handlePaymentSucceeded(Event event) throws StripeException {
        PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);

        System.out.println(paymentIntent);
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
            // @TODO:
            // reduce product quantity and handle refund here use optimistic locking
            //@END:TODO
            orderService.addOrder(paymentIntent.getId(), addOrderRequest, customer.getEmail());
            orderService.updateOrderStatus(paymentIntent.getId(), OrderStatus.PAID);
        }
    }

    public void handlePaymentFailed(Event event) {

    }
}
