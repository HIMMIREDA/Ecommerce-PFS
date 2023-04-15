package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.ProductImageEntity;
import com.ensa.ecommerce_backend.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
@Transactional
public class StoringImageService {

    private ProductImageRepository productImageRepository;


    public StoringImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }


    public String uploadImageToFileSystem(MultipartFile file) throws IOException {

        // Get the root directory of the project
        Path rootDir = Paths.get("").toAbsolutePath();

        // Get the resources directory
        Path resourcesDir = rootDir.resolve("src/main/resources");

        // Get the images directory within the resources directory
        Path imagesDir = resourcesDir.resolve("images");

        // Create the images directory if it doesn't exist
        if (!Files.exists(imagesDir)) {
            Files.createDirectories(imagesDir);
        }

        // Save the uploaded file to the images directory
        Path filePath = imagesDir.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save the file information to the database
        productImageRepository.save(ProductImageEntity.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imagePath(filePath.toString())
                .build());

        return "File uploaded successfully: " + filePath.toString();
    }


    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<ProductImageEntity> productImageEntity = productImageRepository.findByName(fileName);
        String filePath=productImageEntity.get().getImagePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }
}
