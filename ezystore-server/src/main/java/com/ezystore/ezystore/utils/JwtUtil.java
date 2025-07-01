package com.ezystore.ezystore.utils;

import com.ezystore.ezystore.entity.Customer;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration-millis}")
    private long expirationMillis;

    @Value("${jwt.issuer:Ezy.com}")
    private String issuer;

    private SecretKey getSigningKey() {
        byte[] decode = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(decode);
    }

    public String generateJwtToken(Authentication authentication) {
        var customer = (Customer) authentication.getPrincipal();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .issuer(issuer)
                .subject(String.valueOf(customer.getCustomerId()))
                .claim("name", customer.getName())
                .claim("email", customer.getEmail())
                .claim("roles", authentication.getAuthorities().stream().map(
                        GrantedAuthority::getAuthority
                ).collect(Collectors.joining(",")))
                .issuedAt(now)
                .expiration(expiry)
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return Long.valueOf(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.warn("JWT token has expired: {}", ex.getMessage());
        } catch (SecurityException ex) {
            log.warn("Invalid JWT signature: {}", ex.getMessage());
        } catch (JwtException ex) {
            log.warn("Invalid JWT token: {}", ex.getMessage());
        } catch (Exception ex) {
            log.error("Unexpected error during JWT validation: {}", ex.getMessage(), ex);
        }
        return false;
    }
}
