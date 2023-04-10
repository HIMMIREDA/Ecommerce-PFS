package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import com.ensa.ecommerce_backend.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@Transactional
public class StoringImageService {

    private final ProductImageRepository productImageRepository;

    private final String FOLDER_PATH= "\\\\wsl$/Ubuntu/home/elaafani/Ecommerce-PFS/backend/src/main/resources/productImages/";

    public StoringImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }


    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        ProductImageEntity image = productImageRepository.save(ProductImageEntity.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imagePath(filePath).build());

        file.transferTo(new File(filePath));

        return "file uploaded successfully : " + filePath;
    }


    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<ProductImageEntity> productImageEntity = productImageRepository.findByName(fileName);
        String filePath=productImageEntity.get().getImagePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }
}
