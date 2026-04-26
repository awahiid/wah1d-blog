plugins {
	kotlin("jvm") version "1.9.24"
	kotlin("plugin.spring") version "1.9.24"
	kotlin("plugin.jpa") version "1.9.24"
	kotlin("plugin.serialization") version "1.9.24"

	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.7"

	kotlin("kapt") version "1.9.24"
}

group = "com.wah1d.blog"
version = "0.0.1-SNAPSHOT"
description = "backend"

java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(17))
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// --- Spring core ---
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("org.springframework.boot:spring-boot-starter-security")

	// --- Kotlin ---
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")

	// --- OpenAPI ---
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0")

	// --- Dev ---
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// --- DB ---
	runtimeOnly("com.h2database:h2")
	implementation("org.postgresql:postgresql")

	// --- QueryDSL ---
	implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
	kapt("com.querydsl:querydsl-apt:5.0.0:jakarta")

	// --- Tests ---
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
	jvmToolchain(17)
}

kapt {
	correctErrorTypes = true
}

allOpen {
	annotation("jakarta.persistence.Entity")
	annotation("jakarta.persistence.MappedSuperclass")
	annotation("jakarta.persistence.Embeddable")
}

tasks.withType<Test> {
	useJUnitPlatform()
}