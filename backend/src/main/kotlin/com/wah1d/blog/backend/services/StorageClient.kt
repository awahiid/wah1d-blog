package com.wah1d.blog.backend.services

interface StorageClient {
    fun upload(bucket: String, path: String, content: ByteArray, contentType: String)

    fun download(bucket: String, path: String): ByteArray

    fun delete(bucket: String, path: String)

    fun getContentURl(bucket: String, path: String): String
}
