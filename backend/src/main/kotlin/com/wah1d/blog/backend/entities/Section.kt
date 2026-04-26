package com.wah1d.blog.backend.entities

import jakarta.persistence.*

@Entity
class Section(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(length = 20, nullable = false, unique = true)
    var name: String,

    @OneToMany(mappedBy = "section")
    var posts: MutableSet<Post> = mutableSetOf()
)