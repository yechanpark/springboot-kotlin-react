package com.yechanpark.springbootkotlinreact.service

import com.yechanpark.springbootkotlinreact.model.Board
import com.yechanpark.springbootkotlinreact.repository.BoardRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class BoardService(private val boardRepository: BoardRepository) { // constructor DI

    fun getBoard(id: Int): Board {
        return boardRepository.getOne(id)
    }

    fun getBoards(pageable: Pageable): Page<Board> {
        return boardRepository.findAll(pageable)
    }

    fun save(board: Board) {
        boardRepository.save(board)
    }

    fun delete(boardId: Int) {
        boardRepository.deleteById(boardId)
    }
}