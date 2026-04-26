package com.wah1d.blog.backend.dtos.posts

import com.fasterxml.jackson.databind.JsonNode
import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Block of content within a post, such as text, image, or other media.")
data class PostBlockDTO(
    @field:Schema(
        description = "Unique identifier of the content block.",
        example = "1",
        type = "integer",
        format = "int64"
    )
    val id: Long,
    @field:Schema(
        description = "Position of the block in the post.",
        example = "1",
        type = "integer",
        format = "int64"
    )
    val position: Long,
    @field:Schema(
        description = "Type of the content block (e.g., text, image, code).",
        example = "text",
        type = "string"
    )
    val type: String,
    @field:Schema(
        description = "Arbitrary JSON content",
        type = "object",
        example = """
            {
              "text": "This is a paragraph",
              "style": {
                "bold": true
              }
            }
        """
    )
    val content: JsonNode
)