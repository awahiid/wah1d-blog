package com.wah1d.blog.backend.exceptions

import com.wah1d.blog.backend.dtos.ErrorDTO
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.security.authorization.AuthorizationDeniedException

/**
 * Class responsible for globally handling exceptions thrown in the system.
 * Uses Spring annotations to handle specific exceptions and return appropriate responses
 * with the corresponding HTTP status codes.
 */
@RestControllerAdvice
class GlobalExceptionHandler {
    /**
     * Handles the NotFoundException. This exception occurs when the requested content is not found.
     * Returns a response with HTTP status code 404 (Not Found).
     *
     * @param ex The NotFoundException.
     * @return A ResponseEntity object with an error message and status code 404.
     */
    @ExceptionHandler(NotFoundException::class)
    fun handleContentNotFound(ex: NotFoundException) = ResponseEntity(
        ErrorDTO( status = HttpStatus.NOT_FOUND.value(), message = "Content not found: " + ex.message),
        HttpStatus.NOT_FOUND
    )

    /**
     * Handles the BadRequestException. This exception occurs when a required value is null or the request is invalid.
     * Returns a response with HTTP status code 400 (Bad Request).
     *
     * @param ex The BadRequestException.
     * @return A response with the error message and status code 400.
     */
    @ExceptionHandler(BadRequestException::class)
    fun handleBadRequestException(ex: BadRequestException) = ResponseEntity(
        ErrorDTO(status = HttpStatus.BAD_REQUEST.value(), message = "Bad request error: " + ex.message),
        HttpStatus.BAD_REQUEST
    )

    /**
     * Handles the ForbiddenException. This exception occurs when the user is not authorized.
     * Returns a response with HTTP status code 403 (Forbidden).
     *
     * @param ex The ForbiddenException.
     * @return A response with the error message and status code 403.
     */
    @ExceptionHandler(ForbiddenException::class)
    fun handleUnauthorizedException(ex: ForbiddenException) = ResponseEntity(
        ErrorDTO(status = HttpStatus.FORBIDDEN.value(), message = "Forbidden request error: " + ex.message),
        HttpStatus.FORBIDDEN
    )

    /**
     * Handles the AuthorizationDeniedException. This exception occurs when access is denied.
     * Returns a response with HTTP status code 403 (Forbidden).
     *
     * @param ex The AuthorizationDeniedException.
     * @return A response with the error message and status code 403.
     */
    @ExceptionHandler(AuthorizationDeniedException::class)
    fun handleAccessDeniedException(ex: AuthorizationDeniedException) = ResponseEntity(
        ErrorDTO(status = HttpStatus.FORBIDDEN.value(), message = "Forbidden request error: " + ex.message),
        HttpStatus.FORBIDDEN
    )

    /**
     * Handles all general exceptions not handled by other handlers.
     * Returns a response with HTTP status code 500 (Internal Server Error).
     *
     * @param ex    The general exception.
     * @return An error view and status code 500.
     */
    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleGeneralException(ex: Exception, request: HttpServletRequest): ResponseEntity<ErrorDTO> {
        logger.error("UNHANDED ERROR AT {}: {}", request.requestURI, ex.message)
        logger.error(ex.stackTraceToString())

        val error = ErrorDTO(status = HttpStatus.INTERNAL_SERVER_ERROR.value(), message = "Internal server error")
        return ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)
    }
}