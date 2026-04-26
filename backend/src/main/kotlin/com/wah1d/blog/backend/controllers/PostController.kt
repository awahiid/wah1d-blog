package com.wah1d.blog.backend.controllers

import com.wah1d.blog.backend.controllers.specs.PostControllerSpec
import com.wah1d.blog.backend.dtos.posts.PostDTO
import com.wah1d.blog.backend.dtos.posts.PostDetails
import com.wah1d.blog.backend.dtos.posts.PostFilterParams
import com.wah1d.blog.backend.dtos.posts.UpdatePostReq
import com.wah1d.blog.backend.services.PostService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import java.util.UUID

@Controller
class PostController (
    val postService: PostService
) : PostControllerSpec  {
    override fun getSections(): ResponseEntity<List<String>> =
        ResponseEntity.ok(postService.getSections())

    override fun getTags(): ResponseEntity<List<String>> =
        ResponseEntity.ok(postService.getTags())

    override fun createPost(): ResponseEntity<PostDTO> =
        ResponseEntity.ok(postService.createPost())

    override fun getPostById(id: UUID): ResponseEntity<PostDTO> =
        ResponseEntity.ok(postService.getPostById(id))

    override fun getPostBySlug(slug: String): ResponseEntity<PostDTO> =
        ResponseEntity.ok(postService.getPostBySlug(slug))

    override fun getFilteredPosts(params: PostFilterParams): ResponseEntity<Page<PostDetails>> =
        ResponseEntity.ok(postService.getPublicFilteredPosts(params))

    override fun getUserFilteredPosts(params: PostFilterParams, deleted: Boolean?, published: Boolean?): ResponseEntity<Page<PostDetails>> =
        ResponseEntity.ok(postService.getUserFilteredPosts(params, deleted, published))

    override fun updatePost(updatePostReq: UpdatePostReq): ResponseEntity<PostDTO> =
        ResponseEntity.ok(postService.updatePost(updatePostReq))

    override fun purgePost(id: UUID): ResponseEntity<Void> {
        postService.purgePost(id)
        return ResponseEntity.ok().build()
    }
}