package com.yechanpark.springbootkotlinreact.controller

import com.yechanpark.springbootkotlinreact.model.Board
import com.yechanpark.springbootkotlinreact.service.BoardService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.data.web.SortDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class ApiController{

    // Field DI
    @Autowired
    lateinit var boardService: BoardService

    /*
    {
      "content": [
        {
          "id": 355,
          "title": "default title355",
          "contents": "default contents355",
          "date": "2020-05-13T22:54:25.374195"
        },
        {...},
        {...}
      ],
      "pageable": {
        "sort": {
          "sorted": true,
          "unsorted": false,
          "empty": false
        },
        "offset": 0,
        "pageSize": 10,
        "pageNumber": 0,
        "paged": true,
        "unpaged": false
      },
      "totalElements": 355,
      "last": false,
      "totalPages": 36,
      "size": 10,
      "number": 0,
      "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
      },
      "numberOfElements": 10,
      "first": true,
      "empty": false
    }
    */
    @GetMapping("/boards")
    fun getBoards(
        @PageableDefault(
            size = 10,
            page = 0
        )
        @SortDefault.SortDefaults(
            SortDefault(sort = ["date", "id"], direction = Sort.Direction.DESC)
        )
        pageable: Pageable
    ): ResponseEntity<*> {
        return ResponseEntity(boardService.getBoards(pageable), HttpStatus.CREATED)
    }

    @GetMapping("/board/{boardId}")
    fun getBoard(@PathVariable("boardId") boardId: Int): ResponseEntity<*> {
        return ResponseEntity(boardService.getBoard(boardId), HttpStatus.CREATED)
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

    @PutMapping("/board/{boardId}")
    fun updateBoard(@RequestBody board: Board, @PathVariable("boardId") boardId: Int): ResponseEntity<*> {
        val oldBoard = boardService.getBoard(boardId)
        oldBoard.title      = board.title
        oldBoard.contents   = board.contents
        boardService.save(oldBoard)
        return ResponseEntity<HttpStatus>(HttpStatus.OK)
    }

}


