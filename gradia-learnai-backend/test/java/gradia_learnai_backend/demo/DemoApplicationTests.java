package com.gradia.learnai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GradiaLearnAiApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(GradiaLearnAiApplication.class, args);
    }
}