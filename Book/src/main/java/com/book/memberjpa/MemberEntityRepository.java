package com.book.memberjpa;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberEntityRepository extends JpaRepository<MemberEntity, String> {
    // 'name'과 'email'을 사용해 사용자 찾기
    Optional<MemberEntity> findByNameAndEmail(String name, String email);
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