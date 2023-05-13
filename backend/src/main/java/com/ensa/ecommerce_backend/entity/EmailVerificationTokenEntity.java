package com.ensa.ecommerce_backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Entity
@Getter
@Setter
public class EmailVerificationTokenEntity implements Serializable {
    private static final int EXPIRATION = 1440; // 24 hours
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String token;
    private Date expiryDate;
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;
    public EmailVerificationTokenEntity(UserEntity user, String token) {
        this.token = token;
        this.expiryDate = this.calculateExpiryDate();
        this.user = user;
    }


    public EmailVerificationTokenEntity() {

    }

    private Date calculateExpiryDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Timestamp(calendar.getTime().getTime()));
        calendar.add(Calendar.MINUTE, EXPIRATION);
        return new Date(calendar.getTime().getTime());
    }
}

