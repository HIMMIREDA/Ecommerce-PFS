package com.ensa.ecommerce_backend.listener;

import com.ensa.ecommerce_backend.entity.UserEntity;
import com.ensa.ecommerce_backend.event.OnRegistrationCompleteEvent;
import com.ensa.ecommerce_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.UUID;

@Component
@AllArgsConstructor
public class OnRegistrationCompleteEventListener {
    private AuthService authService;
    private JavaMailSender mailSender;

    @Async
    @EventListener
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleRegistrationCompleteEvent(OnRegistrationCompleteEvent event) {
        UserEntity user = event.getUser();
        String token = UUID.randomUUID().toString();
        authService.createEmailVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "STORE Registration Confirmation";
        String confirmationUrl = event.getUrl() + "?token=" + token;
        String message = "Please validate your account at : ";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\r\n" + "http://localhost:8080" + confirmationUrl);
        mailSender.send(email);
    }
}

