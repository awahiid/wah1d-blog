package com.wah1d.blog.backend.security

import org.springframework.security.oauth2.jwt.Jwt
import java.util.UUID

data class AuthenticatedUser(
    val id: UUID,
    val email: String,
    val role: String,
) {
    constructor(jwt: Jwt) : this(
        id = UUID.fromString(jwt.getClaimAsString("sub")),
        email = jwt.getClaimAsString("email") ?: "",
        role = jwt.getClaimAsString("role"),
    )
}