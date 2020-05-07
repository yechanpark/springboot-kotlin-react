package com.yechanpark.springbootkotlinreact.controller

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ApiController(
    val objectMapper: ObjectMapper = ObjectMapper()
) {

    @GetMapping("/hello")
    fun hello(): String {
        print("asdasd");
        val result: HashMap<String, String> = HashMap()
        result["message"] = "안녕"
        return objectMapper.writeValueAsString(result)
    }
}


