package com.wah1d.blog.backend.security

import org.springframework.core.convert.converter.Converter
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt

class JwtToAuthenticatedUserConverter : Converter<Jwt, AuthenticatedUserToken> {
    override fun convert(jwt: Jwt): AuthenticatedUserToken {
        val user = AuthenticatedUser(jwt)
        val authorities = setOf(SimpleGrantedAuthority("ROLE_${user.role.uppercase()}"))
        return AuthenticatedUserToken(jwt, user, authorities)
    }
}