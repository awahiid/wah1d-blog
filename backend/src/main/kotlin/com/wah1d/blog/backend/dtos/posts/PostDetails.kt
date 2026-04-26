package com.wah1d.blog.backend.dtos.posts

import com.wah1d.blog.backend.dtos.sections.SectionDetails
import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDateTime
import java.util.UUID

@Schema(description = "Detailed information about a blog post, including status and publication details.")
data class PostDetails(
    @Schema(
        description = "Unique identifier of the post.",
        example = "b3b6c7e2-8e2a-4c2a-9b2a-1a2b3c4d5e6f",
        type = "string",
        format = "uuid"
    )
    val id: UUID,
    @Schema(
        description = "Title of the post.",
        example = "How to use OpenAPI with Spring Boot",
        type = "string"
    )
    val title: String,
    @Schema(
        description = "Date and time when the post was created.",
        example = "2024-04-22T10:15:30",
        type = "string",
        format = "date-time"
    )
    val createdAt: LocalDateTime,
    @Schema(
        description = "Set of cover image URLs for the post.",
        example = "[\"https://example.com/cover1.jpg\", \"https://example.com/cover2.jpg\"]",
        type = "array"
    )
    val covers: Set<String>,
    @Schema(
        description = "Short description of the post.",
        example = "A comprehensive guide to integrating OpenAPI in your Spring Boot project.",
        type = "string"
    )
    val description: String,
    @Schema(
        description = "Section of the post."
    )
    val section: String?,
    @Schema(
        description = "Set of tags associated with the post.",
        type = "array",
        example = "[\"spring\", \"openapi\"]"
    )
    val tags: Set<String>,
    @Schema(
        description = "Slug (URL-friendly identifier) for the post.",
        example = "how-to-use-openapi-with-spring-boot",
        type = "string",
        nullable = true
    )
    val slug: String?,
    @Schema(
        description = "Indicates if the post is deleted.",
        example = "false",
        type = "boolean"
    )
    val deleted: Boolean,
    @Schema(
        description = "Indicates if the post is published.",
        example = "true",
        type = "boolean"
    )
    val published: Boolean,
    @Schema(
        description = "Date and time when the post was published.",
        example = "2024-04-23T12:00:00",
        type = "string",
        format = "date-time",
        nullable = true
    )
    val publishedAt: LocalDateTime?,
)