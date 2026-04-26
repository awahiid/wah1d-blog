package com.wah1d.blog.backend.entities.converters

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter(autoApply = false)
class JsonNodeConverter : AttributeConverter<JsonNode, String> {

    private val mapper = jacksonObjectMapper()

    override fun convertToDatabaseColumn(attribute: JsonNode?): String {
        return attribute?.let { mapper.writeValueAsString(it) } ?: "null"
    }

    override fun convertToEntityAttribute(dbData: String?): JsonNode {
        return dbData?.let { mapper.readTree(it) } ?: mapper.readTree("null")
    }
}