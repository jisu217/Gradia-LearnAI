package com.gradia.learnai.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gradia LearnAI API")
                        .description("스마트 학습 도구 백엔드 API 문서")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Gradia Team")
                                .email("contact@gradia.com")));
    }
}