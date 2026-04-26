package com.wah1d.blog.backend.entities

import jakarta.persistence.*

@Entity
class Tag(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(length = 20, nullable = false, unique = true)
    var name: String,

    @ManyToMany(mappedBy = "tags")
    var posts: MutableSet<Post> = mutableSetOf()
)