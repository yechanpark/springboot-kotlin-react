package com.yechanpark.springbootkotlinreact.service

import com.yechanpark.springbootkotlinreact.model.Board
import com.yechanpark.springbootkotlinreact.repository.BoardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository

    fun getBoard(id: Int): Board {
        return boardRepository.getOne(id)
    }

    fun getBoards(): List<Board> {
        return boardRepository.findAll()
    }

    fun save(board: Board) {
        boardRepository.save(board)
    }
}