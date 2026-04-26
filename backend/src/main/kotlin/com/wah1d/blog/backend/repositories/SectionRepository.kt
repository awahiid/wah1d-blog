package com.wah1d.blog.backend.repositories

import com.wah1d.blog.backend.entities.Section
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface SectionRepository : JpaRepository<Section, UUID> {
    fun findByName(name: String): Section?
    fun findAllByNameIn(names: Collection<String>): List<Section>
    fun findAllByPostsId(postId: UUID): HashSet<Section>
}