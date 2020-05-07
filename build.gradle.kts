import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.moowork.gradle.node.npm.NpmTask
import com.moowork.gradle.node.yarn.YarnTask

plugins {
    id("org.springframework.boot") version "2.2.6.RELEASE"
    id("io.spring.dependency-management") version "1.0.9.RELEASE"
    kotlin("jvm") version "1.3.71"
    kotlin("plugin.spring") version "1.3.71"
    // https://github.com/srs/gradle-node-plugin/issues/301
    id("com.github.node-gradle.node") version "2.2.3"
    //id("com.moowork.node") version "1.3.1" // nodejs 의존 추가
}

//apply(plugin = "com.moowork.node")

group = "com.yechanpark"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

val webappDir = "$projectDir/src/main/webapp"

node {
    version= "12.16.3"
    npmVersion = "6.14.4"
    download = true
}

tasks {

    compileKotlin {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget="11"
        }
        dependsOn(processResources)
    }

    register<NpmTask>("appNpmInstall") {
        setWorkingDir(file(webappDir))
        setArgs(mutableListOf("install"))
        //args = ["run", "build"]
    }

    register<YarnTask>("yarnBuild") {
        setWorkingDir(file(webappDir))
        args = mutableListOf("build")
    }

    register<Copy>("copyWebApp") {
        from("src/main/webapp/build")
            .into("build/resources/main/static")
    }
}

tasks["yarnBuild"].dependsOn("appNpmInstall")
tasks["copyWebApp"].dependsOn("yarnBuild")
tasks["compileKotlin"].dependsOn("copyWebApp")