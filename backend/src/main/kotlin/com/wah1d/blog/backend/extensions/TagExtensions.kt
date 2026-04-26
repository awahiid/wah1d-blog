package com.wah1d.blog.backend.extensions

import com.wah1d.blog.backend.dtos.tags.TagDetails
import com.wah1d.blog.backend.entities.Tag

fun Tag.toDetails() = TagDetails(
    name = this.name
)