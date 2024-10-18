package com.book.memberjpa;

import com.book.DTO.MembershipDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberEntityService {

    private final MemberEntityRepository memberEntityRepository;

    @Autowired
    public MemberEntityService(MemberEntityRepository memberEntityRepository) {
        this.memberEntityRepository = memberEntityRepository;
    }

    public void register(MembershipDTO membershipDTO) {
        // DTO를 엔티티로 변환
        MemberEntity member = new MemberEntity();
        member.setId(membershipDTO.getUserid());
        member.setPassword(membershipDTO.getPassword());
        member.setName(membershipDTO.getName());
        member.setPhoneNumber(membershipDTO.getPhoneNumber());
        member.setEmail(membershipDTO.getEmail());
        member.setVoucher(0); // 기본 값 설정

        // 데이터베이스에 저장
        memberEntityRepository.save(member);
    }
}

