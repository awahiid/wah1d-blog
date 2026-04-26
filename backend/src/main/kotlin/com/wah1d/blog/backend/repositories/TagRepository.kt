package com.wah1d.blog.backend.repositories

import com.wah1d.blog.backend.entities.Tag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface TagRepository : JpaRepository<Tag, UUID> {
    fun findByName(name: String): Tag?
    fun findAllByNameIn(names: Collection<String>): List<Tag>
    fun findAllByPostsId(postId: UUID): HashSet<Tag>
}