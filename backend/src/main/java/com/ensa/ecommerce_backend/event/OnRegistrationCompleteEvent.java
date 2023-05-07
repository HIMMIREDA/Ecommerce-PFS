package com.ensa.ecommerce_backend.event;

import com.ensa.ecommerce_backend.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String url;
    private UserEntity user;
    public OnRegistrationCompleteEvent(UserEntity user,String url) {
        super(user);
        this.user = user;
        this.url = url;
    }
}
