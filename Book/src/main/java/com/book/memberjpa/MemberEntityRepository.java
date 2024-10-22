package com.book.memberjpa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberEntityRepository extends JpaRepository<MemberEntity, String> {
    // 필요한 경우 추가 쿼리 메서드를 정의할 수 있습니다.
}
/**       mysql  테이블 생성쿼리
 CREATE TABLE Member (
 id VARCHAR(255) NOT NULL PRIMARY KEY,
 password VARCHAR(255) NOT NULL,
 name VARCHAR(255) NOT NULL,
 phone_number VARCHAR(255),
 email VARCHAR(255),
 voucher INT
 );
 */