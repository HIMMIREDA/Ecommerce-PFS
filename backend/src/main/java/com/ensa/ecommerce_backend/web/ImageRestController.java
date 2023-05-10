package com.ensa.ecommerce_backend.web;


import com.ensa.ecommerce_backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images/")
@AllArgsConstructor
public class ImageRestController {
    private ImageService imageService;

    @GetMapping(value = "/{imageId}.{extension}")
    public ResponseEntity<Resource> getImageById(@PathVariable("imageId") String imageId, @PathVariable("extension") String extension) {
        byte[] Binaryimage = imageService.getImageById(imageId);
        ByteArrayResource image = new ByteArrayResource(Binaryimage);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/" + extension))
                .contentLength(image.contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline()
                                .filename(imageId + "." + extension)
                                .build().toString()
                )
                .body(image);
    }
}
