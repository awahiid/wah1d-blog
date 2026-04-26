package com.wah1d.blog.backend.extensions

import com.wah1d.blog.backend.dtos.posts.PostBlockDTO
import com.wah1d.blog.backend.dtos.posts.PostDTO
import com.wah1d.blog.backend.dtos.posts.PostDetails
import com.wah1d.blog.backend.dtos.tags.TagDetails
import com.wah1d.blog.backend.entities.Post
import com.wah1d.blog.backend.entities.PostBlock

fun Post.toDTO(tags: Set<TagDetails>, content: List<PostBlockDTO>) = PostDTO(
    id = this.id,
    title = this.title,
    createdAt = this.createdAt,
    covers = this.covers,
    description = this.description,
    section = this.section?.name,
    tags = tags.map { it.name }.toSet(),
    content = content.sortedBy { it.position },
    slug = this.slug,
    deleted = this.deleted,
    published = this.published
)

fun Post.toDetails(tags: Set<String>) = PostDetails(
    id = this.id,
    title = this.title,
    createdAt = this.createdAt,
    covers = this.covers,
    description = this.description,
    slug = this.slug,
    published = this.published,
    publishedAt = this.publishedAt,
    section = this.section?.name,
    tags = tags,
    deleted = this.deleted
)

fun PostBlock.toDTO() = PostBlockDTO(
    id = this.id,
    position = this.position,
    type = this.type,
    content = this.content
)

fun PostBlockDTO.toEntity(post: Post) = PostBlock(
    id = this.id,
    position = this.position,
    type = this.type,
    content = this.content,
    post = post
)