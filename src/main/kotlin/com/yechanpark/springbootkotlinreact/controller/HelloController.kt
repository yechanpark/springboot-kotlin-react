package com.yechanpark.springbootkotlinreact.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HelloController {

    @GetMapping("/", "/main", "/dashboard")
    fun init(): String {
        return "index.html";
    }
}