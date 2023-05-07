package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.ImageEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StoringImageService {
    public ImageEntity uploadImageToFileSystem(MultipartFile file);
    public byte[] downloadImageFromFileSystem(String fileName) throws IOException;

}
