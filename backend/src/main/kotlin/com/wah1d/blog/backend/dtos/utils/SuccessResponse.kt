package com.wah1d.blog.backend.dtos.utils

import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Standard response wrapper containing status, message, and data.")
data class SuccessResponse<T>(
    @Schema(description = "Human-readable message describing the response")
    val message: String,

    @Schema(description = "Status code representing the outcome of the request")
    val status: String,

    @Schema(description = "Response payload data, varies by endpoint")
    val data: T? = null
)