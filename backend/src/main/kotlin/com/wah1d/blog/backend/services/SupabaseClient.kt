package com.wah1d.blog.backend.services

import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class SupabaseClient(
    @param:Value("\${supabase.url}") private val baseUrl: String,
    @Value("\${supabase.key}") apiKey: String
) : StorageClient {
    private val restTemplate: RestTemplate = RestTemplate()
    private val defaultHeaders: HttpHeaders = HttpHeaders()

    init {
        this.defaultHeaders.set("apikey", apiKey)
        this.defaultHeaders.set("Authorization", "Bearer $apiKey")
    }

    override fun upload(bucket: String, path: String, content: ByteArray, contentType: String) {
        val headers = HttpHeaders(this.defaultHeaders)
        headers.contentType = MediaType.parseMediaType(contentType)
        val request = HttpEntity<ByteArray?>(content, headers)

        val url = "$baseUrl/storage/v1/object/$bucket/$path"
        restTemplate.put(url, request)
    }

    override fun download(bucket: String, path: String): ByteArray {
        val headers = HttpHeaders(this.defaultHeaders)
        val request = HttpEntity<Void?>(headers)

        val url = "$baseUrl/storage/v1/object/$bucket/$path"
        val response = restTemplate.exchange<ByteArray?>(url, HttpMethod.GET, request, ByteArray::class.java)
        return response.getBody()
    }

    override fun delete(bucket: String, path: String) {
        val headers = HttpHeaders(this.defaultHeaders)
        val request = HttpEntity<Void?>(headers)
        headers.remove(HttpHeaders.CONTENT_TYPE)

        val url = "$baseUrl/storage/v1/object/$bucket/$path"
        restTemplate.exchange<Void?>(url, HttpMethod.DELETE, request, Void::class.java)
    }

    override fun getContentURl(bucket: String, path: String): String {
        return "$baseUrl/storage/v1/object/public/$bucket/$path"
    }
}