package com.wah1d.blog.backend.dtos

import io.swagger.v3.oas.annotations.media.Schema
import java.time.LocalDateTime

@Schema(description = "Standard error response used throughout the API.")
data class ErrorDTO(
    @field:Schema(
        description = "HTTP status code of the error",
        example = "404"
    )
    val status: Int,

    @field:Schema(
        description = "Date and time when the error occurred",
        example = "2025-11-04T10:15:30"
    )
    val timestamp: LocalDateTime = LocalDateTime.now(),

    @field:Schema(
        description = "Indicates if the operation was successful (always false in case of error)",
        example = "false"
    )
    val success: Boolean = false,

    @field:Schema(
        description = "Descriptive error message",
        example = "Resource not found"
    )
    val message: String
)