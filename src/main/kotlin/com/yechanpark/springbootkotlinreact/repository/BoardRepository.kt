package com.yechanpark.springbootkotlinreact.repository

import com.yechanpark.springbootkotlinreact.model.Board
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BoardRepository: JpaRepository<Board, Int>