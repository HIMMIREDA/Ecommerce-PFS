package com.ensa.ecommerce_backend.security.jwt;

import com.ensa.ecommerce_backend.enums.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.KeyFactory;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Data
@NoArgsConstructor
public class JwtService {
    @Value("${application.security.jwt.access-token.priv-secret-key}")
    private String accessTokenPrivKey;
    @Value("${application.security.jwt.access-token.pub-secret-key}")
    private String accessTokenPubKey;
    @Value("${application.security.jwt.access-token.expiration}")
    private Long accessTokenExpiration;
    @Value("${application.security.jwt.refresh-token.priv-secret-key}")
    private String refreshTokenPrivKey;
    @Value("${application.security.jwt.refresh-token.pub-secret-key}")
    private String refreshTokenPubKey;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private Long refreshTokenExpiration;


    private <T> T extractClaim(String token, Function<Claims, T> claimResolver, TokenType tokenType) {
        final Claims claims = extractAllClaims(token, tokenType);
        return claims == null ? null : claimResolver.apply(claims);
    }

    public String extractUsername(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getSubject, tokenType);
    }

    private Date extractExpiration(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getExpiration, tokenType);
    }

    private boolean isTokenExpired(String token, TokenType tokenType) {
        Date expiration = extractExpiration(token, tokenType);
        return expiration == null || expiration.before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType) {
        final String username = extractUsername(token, tokenType);
        return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token, tokenType);
    }

    private Claims extractAllClaims(String token, TokenType tokenType) {
        Claims claims;
        Key pubKey = getPubSecretKey(tokenType.equals(TokenType.ACCESS) ? getAccessTokenPubKey() : getRefreshTokenPubKey());
        try {
            claims = Jwts.parserBuilder().setSigningKey(pubKey).build().parseClaimsJws(token).getBody();
        } catch (JwtException exception) {
            claims = null;
        }
        return claims;
    }

    public String generateAccessToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, TokenType.ACCESS);
    }

    public String generateAccessToken(HashMap<String, Object> extraclaims, UserDetails userDetails) {
        return buildToken(extraclaims, userDetails, TokenType.ACCESS);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, TokenType.REFRESH);
    }

    public String generateRefreshToken(HashMap<String, Object> extraclaims, UserDetails userDetails) {
        return buildToken(extraclaims, userDetails, TokenType.REFRESH);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, TokenType tokenType) {
        Key privKey = getPrivSecretKey(tokenType.equals(TokenType.ACCESS) ? getAccessTokenPrivKey() : getRefreshTokenPrivKey());

        Long expiration = tokenType.equals(TokenType.ACCESS) ? getAccessTokenExpiration() : getRefreshTokenExpiration();
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(privKey, SignatureAlgorithm.RS256)
                .compact();
    }

    private Key getPrivSecretKey(String key) {
        try {

            key = new String(Base64.getDecoder().decode(key));
            key = key.replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll(System.lineSeparator(), "")
                    .replaceAll("\\s", "");
            byte[] keyBytes = Base64.getDecoder().decode(key);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePrivate(keySpec);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    private Key getPubSecretKey(String key) {
        try {
            key = new String(Base64.getDecoder().decode(key));
            key = key.replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll(System.lineSeparator(), "")
                    .replaceAll("\\s", "");
            byte[] keyBytes = Base64.getDecoder().decode(key);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePublic(keySpec);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }
}
