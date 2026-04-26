package com.wah1d.blog.backend.dtos.posts

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Pattern
import java.time.LocalDateTime

data class PostFilterParams(
    @field:Min(value = 0, message = "Page number must be zero or positive")
    val page: Int? = 0,

    @field:Min(value = 1, message = "Size must be at least 1")
    @field:Max(value = 100, message = "Size must not exceed 100")
    val size: Int? = 20,

    val query: String?,

    val sections: List<String>? = emptyList(),

    val tags: List<String>? = emptyList(),

    @field:Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "From date must be in the format yyyy-MM-dd")
    val from: LocalDateTime? = null,

    @field:Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "To date must be in the format yyyy-MM-dd")
    val to: LocalDateTime? = null
)