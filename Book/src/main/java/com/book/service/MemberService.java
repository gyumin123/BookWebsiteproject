package com.book.service;

import com.book.DTO.LoginDTO;
import com.book.DTO.MembershipDTO;
import com.book.domain.Member;
import com.book.repository.MemberRepository;
import com.book.repository.MemoryMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository = new
            MemoryMemberRepository();

    /**
    회원가입
     */
    public String register(MembershipDTO membershipDTO) {
        validateDuplicateMember(membershipDTO);

        Member member = new Member();
        member.setId(membershipDTO.getUserid());
        member.setPassword(membershipDTO.getPassword());
        member.setName(membershipDTO.getName());
        member.setEmail(membershipDTO.getEmail());
        member.setPhoneNumber(membershipDTO.getPhoneNumber());

        memberRepository.save(member);
        return member.getId();
    }

    /**
    중복 ID 검증
     */
    private void validateDuplicateMember(MembershipDTO membershipDTO) {
        memberRepository.findById(membershipDTO.getUserid())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
    로그인
     */
    public boolean login(LoginDTO loginDTO) {
        Optional<Member> optionalMember = memberRepository.findById(loginDTO.getUserid());
        // 입력한 아이디로 저장된 사용자가 없으면 false 리턴
        if(optionalMember.isEmpty()) { return false; }

        Member member = optionalMember.get();
        // 입력한 아이디의 사용자와 비밀번호가 일치하지 않으면 false 리턴
        if(!member.getPassword().equals(loginDTO.getPassword())) {
            return false;
        }

        return true;
    }


    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
    public Optional<Member> findOne(String memberId) {
        return memberRepository.findById(memberId);
    }
}
