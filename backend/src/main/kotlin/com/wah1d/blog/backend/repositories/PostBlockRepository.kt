package com.wah1d.blog.backend.repositories

import com.wah1d.blog.backend.entities.PostBlock
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface PostBlockRepository: JpaRepository<PostBlock, Long> {
    fun findPostBlockByPostId(postId: UUID): Set<PostBlock>

    fun deleteAllByPostId(postId: UUID)
}