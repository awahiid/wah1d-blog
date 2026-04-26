package com.wah1d.blog.backend.entities

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.*

@Entity
class Post {
    @Id
    @Column(nullable = false, updatable = false)
    var id: UUID = UUID.randomUUID()

    @Column(nullable = false)
    var title: String = "New post"

    @Column(columnDefinition = "boolean default false")
    var published: Boolean = false

    @ElementCollection
    @CollectionTable(name = "post_covers", joinColumns = [JoinColumn(name = "post_id")])
    @Column(name = "cover")
    var covers: MutableSet<String> = HashSet<String>()

    @Column(columnDefinition = "TEXT", nullable = false)
    var description: String = ""

    @Column
    var slug: String? = null

    @Column
    var createdAt: LocalDateTime = LocalDateTime.now()

    @Column
    var publishedAt: LocalDateTime? = null

    @ManyToOne
    @JoinColumn(name = "section_id")
    var section: Section? = null

    @ManyToMany
    @JoinTable(
        name = "post_tags",
        joinColumns = [JoinColumn(name = "post_id")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")]
    )
    val tags: MutableSet<Tag> = HashSet<Tag>()

    @OneToMany(mappedBy = "post", cascade = [CascadeType.ALL], orphanRemoval = true)
    val content: MutableSet<PostBlock> = HashSet()

    @Column(columnDefinition = "boolean default false")
    var deleted: Boolean = false

    override fun hashCode(): Int {
        return id.hashCode()
    }
}