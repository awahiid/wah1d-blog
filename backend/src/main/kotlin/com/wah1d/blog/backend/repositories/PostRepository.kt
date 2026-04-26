package com.wah1d.blog.backend.repositories

import com.wah1d.blog.backend.entities.Post
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PostRepository : JpaRepository<Post, Long> {
    fun findById(id: UUID): Post?

    fun findBySlug(slug: String): Post?

    fun findBySlugAndPublishedIsTrue(slug: String): Post?

    fun getPostByIdAndPublishedIsTrue(id: UUID): Post?

    fun findByIdAndDeletedTrue(id: UUID): Post?

    fun findByIdAndDeletedFalse(id: UUID): Post?

    fun findByIdAndPublishedIsFalse(id: UUID): Post?

    fun findAll(spec: Specification<Post>, pageable: Pageable): Page<Post>

    fun existsBySlugAndPublishedIsTrue(slug: String): Boolean
}