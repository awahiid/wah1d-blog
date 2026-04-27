package com.wah1d.blog.backend.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

/**
 * Custom exception representing a bad request error (400 Bad Request).
 *
 * @param message Descriptive error message.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(message: String) : RuntimeException(message)

/**
 * Custom exception representing a forbidden access error (403 Forbidden).
 *
 * @param message Descriptive error message.
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
class ForbiddenException(message: String) : RuntimeException(message)

/**
 * Custom exception representing a not found error (404 Not Found).
 *
 * @param message Descriptive error message.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
class NotFoundException(message: String) : RuntimeException(message)