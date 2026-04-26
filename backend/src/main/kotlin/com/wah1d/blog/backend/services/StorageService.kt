package com.wah1d.blog.backend.services

import com.wah1d.blog.backend.entities.Post
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.IOException

@Service
class StorageService(
    private val supabaseClient: SupabaseClient,
    @Value("\${media.bucket}")
    private val mediaBucket: String
) {
    private fun buildPath(post: Post) =
        "all/" + post.id + "/" + post.slug + ".json"

    fun uploadMedia(file: MultipartFile, imagePath: String?) {
        try {
            val bytes = file.bytes
            require(file.contentType != null) { "File type is null" }
            supabaseClient.upload(mediaBucket, imagePath.toString(), bytes, file.contentType!!)
        } catch (e: IOException) {
            throw IllegalStateException("Failed to read file bytes", e)
        }
    }

    fun deleteMedia(filePath: String) =
        supabaseClient.delete(mediaBucket, filePath)
}