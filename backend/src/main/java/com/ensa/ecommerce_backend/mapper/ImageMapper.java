package com.ensa.ecommerce_backend.mapper;

import com.ensa.ecommerce_backend.dto.ImageDto;
import com.ensa.ecommerce_backend.entity.ImageEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class ImageMapper {

    private static String getBaseUrl() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String scheme = request.getScheme();
        String serverName = "localhost"; // request.getServerName();
        int port = request.getServerPort();
        return scheme + "://" + serverName + ":" + port;
    }

    static public ImageDto toDto(ImageEntity imageEntity) {
        return imageEntity == null ? null :
                ImageDto.builder()
                        .id(imageEntity.getId())
                        .url(getBaseUrl() + "/api/images/" + imageEntity.getId() + "." + imageEntity.getExtension())
                        .build();
    }
}
