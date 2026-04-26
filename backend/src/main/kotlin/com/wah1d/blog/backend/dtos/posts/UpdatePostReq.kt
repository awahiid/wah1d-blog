package com.wah1d.blog.backend.dtos.posts

import io.swagger.v3.oas.annotations.media.Schema
import java.util.UUID

@Schema(description = "Request object for updating an existing blog post.")
class UpdatePostReq(
    @Schema(
        description = "Unique identifier of the post to update.",
        example = "b3b6c7e2-8e2a-4c2a-9b2a-1a2b3c4d5e6f",
        type = "string",
        format = "uuid"
    )
    val id: UUID,
    @Schema(
        description = "New title for the post.",
        example = "Updated post title",
        type = "string",
        nullable = true
    )
    val title: String?,
    @Schema(
        description = "New description for the post.",
        example = "Updated description of the post.",
        type = "string",
        nullable = true
    )
    val description: String?,
    @Schema(
        description = "Updated content blocks for the post.",
        type = "array",
        nullable = true
    )
    val content: Set<PostBlockDTO>?,
    @Schema(
        description = "Updated set of cover image URLs.",
        example = "[\"https://example.com/cover1.jpg\"]",
        type = "array",
        nullable = true
    )
    val covers: Set<String>?,
    @Schema(
        description = "Updated section.",
        example = "Thoughts",
        nullable = true
    )
    val section: String?,
    @Schema(
        description = "Updated set of tag names.",
        example = "[\"spring\", \"openapi\"]",
        type = "array",
        nullable = true
    )
    val tags: Set<String>?,
    @Schema(
        description = "Updated slug for the post.",
        example = "updated-post-title",
        type = "string",
        nullable = true
    )
    val slug: String?,
    @Schema(
        description = "Whether the post should be published.",
        example = "true",
        type = "boolean",
        nullable = true
    )
    val published: Boolean?,
    @Schema(
        description = "Whether the post should be marked as deleted.",
        example = "false",
        type = "boolean",
        nullable = true
    )
    val deleted: Boolean?,
)