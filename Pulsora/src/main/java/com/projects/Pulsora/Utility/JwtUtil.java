package com.projects.Pulsora.Utility;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil
{
    private String Secret_Key = "aVerySecureAndLongSecretKeyThatIsAtLeast32BytesOr256BitsLong";
    private java.security.Key getSigningKey()
    {
        return Keys.hmacShaKeyFor(Secret_Key.getBytes());
    }
    private String createToken(Map<String, Object> claims, String subject)
    {
        return
                Jwts.builder()
                        .claims(claims)
                        .subject(subject)
                        .header().empty().add("typ","JWT")
                        .and()
                        .issuedAt(new Date(System.currentTimeMillis()))
                        .expiration(new Date(System.currentTimeMillis() + 60 * 5 * 1000))
                        .signWith(getSigningKey())
                        .compact();
    }
    public String generateToken(String Username)
    {
        Map<String, Object> claims = new HashMap<>();
        return  createToken(claims, Username);
    }
}
