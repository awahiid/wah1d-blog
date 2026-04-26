package com.wah1d.blog.backend.entities

import com.fasterxml.jackson.databind.JsonNode
import com.wah1d.blog.backend.entities.converters.JsonNodeConverter
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes

@Entity
@Table(name = "post_block")
data class PostBlock(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val position: Long = 0,

    val type: String,

    @Convert(converter = JsonNodeConverter::class)
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    val content: JsonNode,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    val post: Post
)