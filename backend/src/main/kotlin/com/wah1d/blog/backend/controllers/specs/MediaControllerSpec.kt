package com.wah1d.blog.backend.controllers.specs

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses

@RequestMapping("/api/v1/media")
interface MediaControllerSpec {

    @Operation(
        summary = "Upload media file to a post",
        description = "Uploads a media file (image, video, etc.) to the specified post. Only authenticated users can upload files."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "File uploaded successfully.",
                content = [Content(schema = Schema(implementation = String::class))]
            ),
            ApiResponse(
                responseCode = "400",
                description = "Invalid file or post ID."
            ),
            ApiResponse(
                responseCode = "401",
                description = "Unauthorized."
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post not found."
            )
        ]
    )
    @PostMapping(value = ["/{postId}"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @PreAuthorize("hasRole('AUTHENTICATED')")
    fun uploadMedia(
        @Parameter(description = "Media file to upload", required = true)
        @RequestParam("file") file: MultipartFile,
        @Parameter(description = "UUID of the post to which the file will be attached", required = true, example = "b3b6c7e2-8e2a-4c2a-9b2a-1a2b3c4d5e6f")
        @PathVariable postId: UUID
    ): ResponseEntity<String>

    @Operation(
        summary = "Delete media file from a post",
        description = "Deletes a media file from the specified post. Only authenticated users can delete files."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "File deleted successfully."
            ),
            ApiResponse(
                responseCode = "400",
                description = "Invalid file name or post ID."
            ),
            ApiResponse(
                responseCode = "401",
                description = "Unauthorized."
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post or file not found."
            )
        ]
    )
    @DeleteMapping(value = ["{postId}/{fileName}"])
    @PreAuthorize("hasRole('AUTHENTICATED')")
    fun deleteMedia(
        @Parameter(description = "UUID of the post from which the file will be deleted", required = true, example = "b3b6c7e2-8e2a-4c2a-9b2a-1a2b3c4d5e6f")
        @PathVariable postId: UUID,
        @Parameter(description = "Name of the file to delete", required = true, example = "cover1.jpg")
        @PathVariable fileName: String
    ): ResponseEntity<Void>
}