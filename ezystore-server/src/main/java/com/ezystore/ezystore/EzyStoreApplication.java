package com.ezystore.ezystore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
@SpringBootApplication
public class EzyStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(EzyStoreApplication.class, args);
	}

}
