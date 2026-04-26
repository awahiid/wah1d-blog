package com.wah1d.blog.backend.extensions

import com.wah1d.blog.backend.dtos.sections.SectionDetails
import com.wah1d.blog.backend.entities.Section

fun Section.toDetails() = SectionDetails(
    name = this.name
)