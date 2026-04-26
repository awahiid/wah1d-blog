package com.wah1d.blog.backend.config

import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.servers.Server
import org.springdoc.core.customizers.OpenApiCustomizer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig{
    @Value("\${openapi.server.url}")
    private lateinit var serverUrl: String

    @Bean
    fun serverCustomizer(): OpenApiCustomizer {
        return OpenApiCustomizer { openApi ->
            openApi.servers.clear()
            openApi.addServersItem(Server().url(serverUrl))
        }
    }

    @Bean
    fun addJwtSecurity(): OpenApiCustomizer = OpenApiCustomizer { openApi ->
        openApi.paths.forEach { (path, pathItem) ->
            if(!path.contains("public")){
                pathItem.readOperations().forEach { operation ->
                    operation.addSecurityItem(SecurityRequirement().addList("bearerAuth"))
                }
            }
        }
    }
}