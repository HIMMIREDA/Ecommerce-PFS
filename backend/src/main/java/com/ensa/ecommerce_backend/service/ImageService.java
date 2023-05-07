package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.ImageEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    public ImageEntity uploadImageToFileSystem(MultipartFile file);
    public byte[] getImageById(String fileName);

}
