# App
spring.application.name=wah1d-blog-backend

# PostgreSQL config
spring.datasource.url={{.SPRING_DATASOURCE_URL}}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username={{.SPRING_DATASOURCE_USERNAME}}
spring.datasource.password={{.SPRING_DATASOURCE_PASSWORD}}

# JPA / Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true

# Mostrar SQL en consola
debug=true
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Puerto del servidor para desarrollo
server.port={{.SERVER_PORT}}

# Security
spring.security.oauth2.resourceserver.jwt.issuer-uri={{.SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI}}
spring.security.oauth2.resourceserver.jwt.jwk-set-uri={{.SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI}}

openapi.server.url={{.OPENAPI_SERVER_URL}}
supabase.url={{.SUPABASE_URL}}
supabase.key={{.SUPABASE_KEY}}

media.bucket={{.MEDIA_BUCKET}}

frontend.url={{.FRONTEND_URL}}