package com.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BookApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookApplication.class, args);
	}
}

/**
 * -- 스키마 생성
 CREATE SCHEMA IF NOT EXISTS book;

 -- 스키마 사용
 USE book;

 -- Member 테이블 생성
 CREATE TABLE Member (
 id VARCHAR(255) NOT NULL PRIMARY KEY,
 password VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 phone_number VARCHAR(255),
 email VARCHAR(255),
 voucher INT
 );

 CREATE TABLE login_history (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 date VARCHAR(255),
 ip VARCHAR(255)
 );

 */