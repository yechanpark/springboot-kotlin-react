package com.yechanpark.springbootkotlinreact.init

import com.yechanpark.springbootkotlinreact.model.Board
import com.yechanpark.springbootkotlinreact.repository.BoardRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class DataInitializer (
    private val boardRepository: BoardRepository
) : ApplicationRunner {

    override fun run(args: ApplicationArguments?) {
        for (num in 1..35) {
            boardRepository.save(Board(title = "default title$num", contents = "default contents$num"))
        }
    }

}