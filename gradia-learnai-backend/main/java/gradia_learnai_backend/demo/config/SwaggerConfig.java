// Swagger(OpenAPI) 설정 클래스 - API 문서 자동 생성 및 관리

package com.gradia.learnai.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration  // Spring 설정 클래스임을 명시
public class SwaggerConfig {

    @Bean  // OpenAPI 객체를 스프링 빈으로 등록
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gradia LearnAI API")                // API 제목
                        .description("스마트 학습 도구 백엔드 API 문서") // API 설명
                        .version("1.0.0")                           // 버전 정보
                        .contact(new Contact()                      // 연락처 정보
                                .name("Gradia Team")
                                .email("contact@gradia.com")));
    }
}
