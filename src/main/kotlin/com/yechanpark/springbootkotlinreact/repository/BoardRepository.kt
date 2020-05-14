package com.yechanpark.springbootkotlinreact.repository

import com.yechanpark.springbootkotlinreact.model.Board
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface BoardRepository: PagingAndSortingRepository<Board, Int>, JpaRepository<Board, Int>