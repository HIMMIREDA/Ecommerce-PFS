package com.ensa.ecommerce_backend.service.impl;

import com.ensa.ecommerce_backend.entity.ImageEntity;
import com.ensa.ecommerce_backend.repository.ImageRepository;
import com.ensa.ecommerce_backend.service.StoringImageService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class StoringImageServiceImpl implements StoringImageService {

    private ImageRepository imageRepository;

    public ImageEntity uploadImageToFileSystem(MultipartFile file) throws IOException {

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
        UUID id = UUID.randomUUID();
        String storedFileName = id.toString();
        // Save the uploaded file to the images directory
        Path filePath = imagesDir.resolve(storedFileName + "." + com.google.common.io.Files.getFileExtension(file.getOriginalFilename()));
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save the file information to the database
        return imageRepository.save(
                ImageEntity.builder()
                        .id(id)
                        .extension(com.google.common.io.Files.getFileExtension(file.getOriginalFilename()))
                        .imagePath(filePath.toString())
                        .build());

    }


    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<ImageEntity> productImageEntity = imageRepository.findById(UUID.fromString(fileName));
        String filePath = productImageEntity.orElseThrow().getImagePath();
        byte[] image = Files.readAllBytes(new File(filePath).toPath());
        return image;
    }

}
