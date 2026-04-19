// CORS 설정을 위한 구성 클래스 (백엔드와 프론트엔드 간의 교차 출처 요청 허용)

package com.gradia.learnai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration  // Spring 설정 클래스임을 명시
public class CorsConfig {

    @Bean  // 스프링 빈으로 CorsFilter 등록
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // URL 기반 CORS 설정 소스
        CorsConfiguration config = new CorsConfiguration(); // CORS 설정 객체 생성
        
        config.setAllowCredentials(true); // 인증 정보(쿠키, 헤더 등) 포함 허용
        config.addAllowedOrigin("http://localhost:3000"); // 허용할 프론트엔드 주소 1
        config.addAllowedOrigin("http://localhost:3001"); // 허용할 프론트엔드 주소 2
        config.addAllowedHeader("*"); // 모든 요청 헤더 허용
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")); // 허용할 HTTP 메서드 지정
        config.addExposedHeader("Authorization"); // 클라이언트에서 접근 가능한 응답 헤더 지정
        
        source.registerCorsConfiguration("/**", config); // 모든 경로에 대해 CORS 설정 적용
        
        return new CorsFilter(source); // CORS 필터 반환
    }
}
