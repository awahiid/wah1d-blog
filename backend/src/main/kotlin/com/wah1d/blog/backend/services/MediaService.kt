package com.wah1d.blog.backend.services

import com.wah1d.blog.backend.repositories.PostRepository
import com.wah1d.blog.backend.utils.getExtension
import org.apache.coyote.BadRequestException
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.rmi.ServerException
import java.util.*
import kotlin.collections.Set
import kotlin.collections.setOf

@Service
class MediaService(
    private val storageService: StorageService,
    private val postRepository: PostRepository
) {
    val allowedTypes: Map<String, Set<String>> = mapOf(
        "image" to setOf("image/jpeg", "image/png", "image/webp", "image/gif"),
        "video" to setOf("video/mp4", "video/webm"),
        "audio" to setOf("audio/mpeg", "audio/ogg")
    )

    fun uploadMedia(file: MultipartFile, postId: UUID): String {
        if (file.isEmpty) {
            throw BadRequestException("Uploaded file is empty or null")
        }

        postRepository.findById(postId)
            ?: throw NoSuchElementException("Post not found with id: $postId")

        resolveMediaType(file)
        val extension = getExtension(file) ?: throw BadRequestException("File does not have a valid extension")
        val fileName: String = UUID.randomUUID().toString() + '.' + extension
        val filePath = "$postId/$fileName"

        try {
            storageService.uploadMedia(file, filePath)
            return fileName
        } catch (e: RuntimeException) {
            throw ServerException("Internal error while uploading media", e)
        }
    }
    
    fun deleteMedia(postId: UUID, fileName: String) {
        try {
            val filePath = "$postId/$fileName"
            storageService.deleteMedia(filePath)
        } catch (_: RuntimeException) {
            throw ServerException("Internal error while deleting image")
        }
    }

    private fun resolveMediaType(file: MultipartFile): String {
        val contentType = file.contentType
        if (contentType == null) {
            throw BadRequestException("Missing content type")
        }

        for (entry in allowedTypes.entries) {
            if (entry.value.contains(contentType)) {
                return entry.key
            }
        }

        throw BadRequestException("Unsupported file type: $contentType")
    }
}