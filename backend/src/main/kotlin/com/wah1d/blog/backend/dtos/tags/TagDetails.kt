package com.wah1d.blog.backend.dtos.tags

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Tag associated with a post.")
data class TagDetails(
    @Schema(
        description = "Name of the tag.",
        example = "spring",
        type = "string"
    )
    val name: String
)