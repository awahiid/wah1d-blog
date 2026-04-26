package com.wah1d.blog.backend.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtDecoders
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
class SecurityConfig{
    @Value("\${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    lateinit var issuerURI: String

    @Value("\${frontend.url}")
    lateinit var frontendURL: String

    @Bean
    fun jwtDecoder(): JwtDecoder? = JwtDecoders.fromIssuerLocation(issuerURI)

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = mutableListOf(frontendURL)
        configuration.allowedMethods = mutableListOf("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        configuration.allowedHeaders = mutableListOf("*")
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain? {
        http
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/api/v1/posts/public/**").permitAll()
                    .requestMatchers( "/media/**", "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html", "/webjars/**").permitAll()
                    .anyRequest().authenticated()
            }
            .cors(Customizer.withDefaults())
            .csrf { csrfConfig -> csrfConfig!!.disable() }
            .sessionManagement { session ->
                session!!.sessionCreationPolicy( SessionCreationPolicy.STATELESS )
            }
            .oauth2ResourceServer { oauth2 -> oauth2
                .jwt { jwt ->
                    jwt.decoder(jwtDecoder())
                    jwt.jwtAuthenticationConverter(jwtToAuthenticatedUserConverter())
                }
            }

        return http.build()
    }

    @Bean
    fun jwtToAuthenticatedUserConverter() = JwtToAuthenticatedUserConverter()
}