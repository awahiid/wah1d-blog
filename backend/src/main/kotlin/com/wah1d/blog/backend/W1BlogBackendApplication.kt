package com.wah1d.blog.backend

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.security.SecurityScheme
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@OpenAPIDefinition(
	info = Info(
		title = "WAH1D Blog API",
		version = "1.0.0",
		description = "API service for managing users, posts, and content in the WAH1D Blog platform. Provides endpoints for authentication, post creation, retrieval, update, and deletion, as well as user management and filtering capabilities."
	)
)
@SecurityScheme(
	name = "bearerAuth",
	type = SecuritySchemeType.HTTP,
	scheme = "bearer",
	bearerFormat = "JWT",
	`in` = SecuritySchemeIn.HEADER
)
@SpringBootApplication
class W1BlogBackendApplication

fun main(args: Array<String>) {
	runApplication<W1BlogBackendApplication>(*args)
}
