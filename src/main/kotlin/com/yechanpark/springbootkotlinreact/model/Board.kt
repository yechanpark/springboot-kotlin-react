package com.yechanpark.springbootkotlinreact.model

import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class Board(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Int? = null,
    var title: String,
    var contents: String,
    var date: LocalDateTime? = LocalDateTime.now()
)