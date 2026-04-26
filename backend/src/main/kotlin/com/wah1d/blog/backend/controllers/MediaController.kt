package com.wah1d.blog.backend.controllers

import com.wah1d.blog.backend.controllers.specs.MediaControllerSpec
import com.wah1d.blog.backend.services.MediaService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Controller
class MediaController(
    private val mediaService: MediaService,
) : MediaControllerSpec {
    override fun uploadMedia(file: MultipartFile, postId: UUID): ResponseEntity<String> =
        ResponseEntity.ok(mediaService.uploadMedia(file, postId))

    override fun deleteMedia(postId: UUID, fileName: String): ResponseEntity<Void> {
        mediaService.deleteMedia(postId, fileName)
        return ResponseEntity.ok().build()
    }
}