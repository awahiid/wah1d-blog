package com.wah1d.blog.backend.repositories

import com.querydsl.core.BooleanBuilder
import com.querydsl.jpa.impl.JPAQueryFactory
import com.wah1d.blog.backend.dtos.posts.PostDetails
import com.wah1d.blog.backend.dtos.posts.PostFilterParams
import com.wah1d.blog.backend.entities.QPost
import com.wah1d.blog.backend.extensions.toDetails
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Repository

@Repository
class QPostRepository(
    private val queryFactory: JPAQueryFactory
) {
    private val qpost = QPost.post

    fun getFilteredPosts(params: PostFilterParams, published: Boolean?, deleted: Boolean?): Page<PostDetails> {

        val predicate = BooleanBuilder()

        deleted?.let { predicate.and(qpost.deleted.eq(it)) }

        published?.let { predicate.and(qpost.published.eq(it)) }

        params.query?.takeIf { it.isNotBlank() }?.let {
            predicate.and(
                qpost.title.containsIgnoreCase(it)
                    .or(qpost.description.containsIgnoreCase(it))
            )
        }

        params.sections.takeIf { it!!.isNotEmpty() }?.let { predicate.and(qpost.section.name.`in`(it)) }

        params.tags.takeIf { it!!.isNotEmpty() }?.let { predicate.and(qpost.tags.any().name.`in`(it)) }

        params.from?.let { predicate.and(qpost.createdAt.goe(it)) }

        params.to?.let { predicate.and(qpost.createdAt.loe(it)) }

        val pageable = PageRequest.of(params.page!!, params.size!!)

        val content = queryFactory
            .selectFrom(qpost)
            .where(predicate)
            .offset(pageable.offset)
            .limit(pageable.pageSize.toLong())
            .fetch()
            .map { p -> p.toDetails(tags = p.tags.map { it.name }.toSet()) }

        val total = queryFactory
            .select(qpost.count())
            .from(qpost)
            .where(predicate)
            .fetchOne() ?: 0L

        return PageImpl(content, pageable, total)
    }
}