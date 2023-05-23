package com.ensa.ecommerce_backend.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class ContextWrapper {
    @Setter
    @Getter
    private static ApplicationContext context;

    public ContextWrapper(ApplicationContext ac) {
        setContext(ac);
    }
}
