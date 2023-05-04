package com.ensa.ecommerce_backend.service;

import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.repository.ImageRepository;
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
import java.util.UUID;

@Service
@Transactional
public class StoringImageServiceImpl {

    private ImageRepository imageRepository;


    public StoringImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
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
        imageRepository.save(ImageEntity.builder()
                .name(UUID.randomUUID().toString())
                .type(file.getContentType())
                .imagePath(filePath.toString())
                .build());

        return "File uploaded successfully";
    }


    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<ImageEntity> productImageEntity = imageRepository.findByName(fileName);
        String filePath=productImageEntity.get().getImagePath();
        byte[] image = Files.readAllBytes(new File(filePath).toPath());
        return image;
    }


}
