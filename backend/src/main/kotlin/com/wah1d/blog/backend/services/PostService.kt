package com.wah1d.blog.backend.services

import com.wah1d.blog.backend.dtos.posts.PostDTO
import com.wah1d.blog.backend.dtos.posts.PostDetails
import com.wah1d.blog.backend.dtos.posts.PostFilterParams
import com.wah1d.blog.backend.dtos.posts.UpdatePostReq
import com.wah1d.blog.backend.dtos.sections.SectionDetails
import com.wah1d.blog.backend.dtos.tags.TagDetails
import com.wah1d.blog.backend.entities.Post
import com.wah1d.blog.backend.extensions.toDTO
import com.wah1d.blog.backend.extensions.toDetails
import com.wah1d.blog.backend.extensions.toEntity
import com.wah1d.blog.backend.repositories.PostBlockRepository
import com.wah1d.blog.backend.repositories.PostRepository
import com.wah1d.blog.backend.repositories.QPostRepository
import com.wah1d.blog.backend.repositories.SectionRepository
import com.wah1d.blog.backend.repositories.TagRepository
import com.wah1d.blog.backend.utils.generateSlug
import org.springframework.data.domain.Page
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class PostService(
    private val postRepository: PostRepository,
    private val postBlockRepository: PostBlockRepository,
    private val sectionRepository: SectionRepository,
    private val tagRepository: TagRepository,
    private val qpostRepository: QPostRepository,
)  {
    fun getSections(): List<String> =
        sectionRepository.findAll().map { it.name }

    fun getTags(): List<String> =
        tagRepository.findAll().map { it.name }

    fun createPost(): PostDTO {
        val post = postRepository.save(Post())
        return post.toDTO(emptySet(), emptyList())
    }
    
    fun getPostById(id: UUID): PostDTO {
        val post = postRepository.findById(id)
            ?: throw NoSuchElementException("Post not found with id: $id")

        return postToDTO(post)
    }

    fun getPostBySlug(slug: String): PostDTO {
        val post = postRepository.findBySlug(slug)
            ?: throw NoSuchElementException("Post not found with slug: $slug")

        return postToDTO(post)
    }
    
    fun getPublicFilteredPosts(params: PostFilterParams): Page<PostDetails> {
        return qpostRepository.getFilteredPosts(params, published = true, deleted = false)
    }
    
    fun getUserFilteredPosts(params: PostFilterParams, published: Boolean?, deleted: Boolean?): Page<PostDetails> {
        return qpostRepository.getFilteredPosts(params, published, deleted)
    }

    @Transactional
    fun updatePost(req: UpdatePostReq): PostDTO {
        val post = postRepository.findById(req.id)
            ?: throw NoSuchElementException("Post not found with id: ${req.id}")

        req.title?.let {
            post.title = it
            post.slug = generateSlug(it)
        }

        req.slug?.let { post.slug = it }

        if (req.published == true) {
            require(!post.slug.isNullOrBlank()) { "Slug cannot be null or blank when publishing" }

            val existing = postRepository.findBySlugAndPublishedIsTrue(post.slug!!)
            if (existing != null && existing.id != post.id) {
                throw IllegalArgumentException("Slug already used by another published post")
            }
        }

        req.description?.let { post.description = it }
        req.section?.let { section ->
            if (section.isBlank()) {
                post.section = null
            } else {
                val sec = sectionRepository.findByName(section)
                    ?: throw NoSuchElementException("Section not found with name: $section")
                post.section = sec
            }
        }
        req.published?.let { post.published = it }
        req.deleted?.let { post.deleted = it }
        req.covers?.let { post.covers = it.toMutableSet() }

        req.content?.let { newContent ->
            postBlockRepository.deleteAllByPostId(post.id)
            postBlockRepository.saveAll(newContent.map { it.toEntity(post) })
        }

        req.tags?.let { tagNames ->
            val tags = tagRepository.findAllByNameIn(tagNames).toMutableSet()
            post.tags.clear()
            post.tags.addAll(tags)
        }

        return postToDTO(postRepository.save(post))
    }

    fun purgePost(id: UUID) {
        val post = postRepository.findById(id)
            ?: throw NoSuchElementException("Post not found with id: $id")

        postRepository.delete(post)
    }

    private fun postToDTO(post: Post): PostDTO {
        val content = postBlockRepository.findPostBlockByPostId(post.id).map { it.toDTO() }
        val tags = tagRepository.findAllByPostsId(post.id).map { it.toDetails() }.toSet()

        return post.toDTO(tags, content)
    }
}