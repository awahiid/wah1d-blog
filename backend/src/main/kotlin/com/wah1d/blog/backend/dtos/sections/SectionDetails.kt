package com.wah1d.blog.backend.dtos.sections

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Section associated with a post.")
data class SectionDetails(
    @Schema(
        description = "Name of the section.",
        example = "Thougts",
        type = "string"
    )
    val name: String
)