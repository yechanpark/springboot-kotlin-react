package com.yechanpark.springbootkotlinreact.controller

import com.yechanpark.springbootkotlinreact.model.Board
import com.yechanpark.springbootkotlinreact.service.BoardService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class ApiController{
    @Autowired
    lateinit var boardService: BoardService

    @GetMapping("/boards")
    fun getBoards(): ResponseEntity<*> {
        val boards: List<Board> = boardService.getBoards()
        return ResponseEntity(boards, HttpStatus.CREATED)
    }

    @GetMapping("/board/{boardId}")
    fun getBoard(@PathVariable("boardId") boardId: Int): ResponseEntity<*> {
        val board: Board = boardService.getBoard(boardId)
        return ResponseEntity(board, HttpStatus.CREATED)
    }

    @PostMapping("/board")
    fun saveBoard(@RequestBody board: Board): ResponseEntity<*> {
        val newBoard = Board(title = board.title, contents = board.contents)
        boardService.save(newBoard)
        return ResponseEntity(newBoard, HttpStatus.CREATED)
    }

    @DeleteMapping("/board/{boardId}")
    fun deleteBoard(@PathVariable("boardId") boardId: Int): ResponseEntity<*> {
        boardService.delete(boardId)
        return ResponseEntity<HttpStatus>(HttpStatus.OK)
    }

}


