package com.yechanpark.springbootkotlinreact.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebController {

    @GetMapping("/", "/main", "/board/add")
    fun init(): String {
        return "index.html";
    }
}