package com.book.memberjpa;

import com.book.DTO.MembershipDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member-entity")
public class MemberEntityController {

    private final MemberEntityService memberEntityService;

    @Autowired
    public MemberEntityController(MemberEntityService memberEntityService) {
        this.memberEntityService = memberEntityService;
    }

    /**
     * 회원가입
     */
    @PostMapping("/register")
    public String register(@RequestBody MembershipDTO membershipDTO) {
        memberEntityService.register(membershipDTO);
        return "Member registered successfully!";
    }
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