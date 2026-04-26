package com.wah1d.blog.backend.utils

import org.springframework.web.multipart.MultipartFile

fun generateSlug(title: String): String = title.lowercase()
    .replace(Regex("[^a-z0-9]+"), "-")
    .trim('-')

fun getExtension(file: MultipartFile) =
    file.originalFilename
        ?.substringAfterLast('.', "")
        ?.takeIf { it.isNotEmpty() }