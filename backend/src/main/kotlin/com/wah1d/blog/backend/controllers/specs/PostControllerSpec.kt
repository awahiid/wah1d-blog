package com.wah1d.blog.backend.controllers.specs

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import com.wah1d.blog.backend.dtos.posts.PostDTO
import com.wah1d.blog.backend.dtos.posts.PostDetails
import com.wah1d.blog.backend.dtos.posts.PostFilterParams
import com.wah1d.blog.backend.dtos.posts.UpdatePostReq
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.*
import org.springdoc.core.annotations.ParameterObject
import java.util.UUID

@RequestMapping("/api/v1/post")
interface PostControllerSpec {
    @Operation(
        summary = "Get all sections",
        description = "Retrieves the complete list of sections available in the system."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved the list of sections.",
            )
        ]
    )
    @GetMapping("/public/section")
    fun getSections(): ResponseEntity<List<String>>

    @Operation(
        summary = "Get all tags",
        description = "Retrieves the complete list of tags available in the system."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved the list of tags.",
            )
        ]
    )
    @GetMapping("/public/tag")
    fun getTags(): ResponseEntity<List<String>>

    @Operation(
        summary = "Create a new post",
        description = "Creates a new post for the authenticated user and returns the created post data."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully created the post.",
                content = [Content(schema = Schema(implementation = PostDTO::class))]
            )
        ]
    )
    @PreAuthorize("hasRole('AUTHENTICATED')")
    @PostMapping
    fun createPost(): ResponseEntity<PostDTO>

    @Operation(
        summary = "Get post by ID",
        description = "Retrieves a post by its unique identifier (UUID) for authenticated users."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved the post.",
                content = [Content(schema = Schema(implementation = PostDTO::class))]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post not found."
            )
        ]
    )
    @PreAuthorize("hasRole('AUTHENTICATED')")
    @GetMapping("/{id}")
    fun getPostById(@PathVariable id: UUID): ResponseEntity<PostDTO>

    @Operation(
        summary = "Get public post by slug",
        description = "Retrieves a public post using its slug. This endpoint is accessible without authentication."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved the public post.",
                content = [Content(schema = Schema(implementation = PostDTO::class))]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post not found."
            )
        ]
    )
    @GetMapping("/public/{slug}")
    fun getPostBySlug(@PathVariable slug: String): ResponseEntity<PostDTO>

    @Operation(
        summary = "Get filtered public posts",
        description = "Returns a paginated list of public posts filtered by the provided parameters. Requires authentication."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved filtered public posts."
            )
        ]
    )
    @GetMapping("/public")
    fun getFilteredPosts(@Validated @ParameterObject params: PostFilterParams): ResponseEntity<Page<PostDetails>>

    @Operation(
        summary = "Get user's filtered posts",
        description = "Returns a paginated list of the authenticated user's posts filtered by parameters, including deleted and published status."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully retrieved user's filtered posts."
            )
        ]
    )
    @PreAuthorize("hasRole('AUTHENTICATED')")
    @GetMapping
    fun getUserFilteredPosts(@Validated @ParameterObject params: PostFilterParams, @RequestParam deleted: Boolean?, @RequestParam published: Boolean?): ResponseEntity<Page<PostDetails>>

    @Operation(
        summary = "Update a post",
        description = "Updates an existing post with the provided data. Only authenticated users can update their own posts."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully updated the post.",
                content = [Content(schema = Schema(implementation = PostDTO::class))]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post not found."
            )
        ]
    )
    @PreAuthorize("hasRole('AUTHENTICATED')")
    @PutMapping
    fun updatePost(@Validated @RequestBody updatePostReq: UpdatePostReq): ResponseEntity<PostDTO>

    @Operation(
        summary = "Permanently delete a post",
        description = "Permanently deletes a post by its unique identifier (UUID). Only authenticated users can perform this action."
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Successfully deleted the post."
            ),
            ApiResponse(
                responseCode = "404",
                description = "Post not found."
            )
        ]
    )
    @PreAuthorize("hasRole('AUTHENTICATED')")
    @DeleteMapping("/purge/{id}")
    fun purgePost(@PathVariable id: UUID): ResponseEntity<Void>
}