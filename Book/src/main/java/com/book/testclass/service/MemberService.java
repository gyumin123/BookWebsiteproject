package com.book.testclass.service;

import com.book.DTO.LoginDTO;
import com.book.DTO.MailDTO;
import com.book.DTO.MembershipDTO;
import com.book.DTO.UpdatePasswordDTO;
import com.book.testclass.domain.Member;
import com.book.testclass.repository.MemberRepository;
import com.book.testclass.repository.MemoryMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository = new
            MemoryMemberRepository();


    //FindID
    /**
     * 사용자 아이디 찾기
     */
    public String findUserId(String username, String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member member = optionalMember.get();

        if(!member.getName().equals(username))
            return null;
        return member.getId();
    }



    //FindPWD
    /**
     * 사용자 비밀번호 찾기
     */
    /**
     * 임시 비밀번호 전송
     */
    public boolean resetPassword(String userid) {
        Optional<Member> member = findOne(userid);
        if(member.isEmpty()) return false;

        MailService mailService = new MailService();
        // 임시 비밀번호 생성
        String tempPassword = getTempPassword();

        // 임시 비밀번호로 멤버의 비밀번호를 변경
        member.get().setPassword(tempPassword);

        MailDTO mail = mailService.createMail(tempPassword, member.get().getEmail());
        mailService.sendMail(mail);

        return true;
    }

    // 임시 비밀번호 만들기
    private String getTempPassword() {
        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String newPassword = "";

        for (int i = 0; i < 10; i++) {
            int idx = (int) (charSet.length * Math.random());
            newPassword += charSet[idx];
        }

        return newPassword;
    }



    //Login
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



    //membership
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

    private void validateDuplicateMember(MembershipDTO membershipDTO) {
        memberRepository.findById(membershipDTO.getUserid())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }



    //SetPwd
    /**
     * 비밀번호 조회
     */
    public String getPassword(String userid) {
        return findOne(userid).get().getPassword();
    }

    /**
     * 비밀번호 변경
     */
    public boolean updatePassword(UpdatePasswordDTO updatePasswordDTO, String userid) {
        Member member = findOne(userid).get();

        if(member.getPassword().equals(updatePasswordDTO.getCurrentPassword())
                && updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getConfirmNewPassword())) {
            member.setPassword(updatePasswordDTO.getNewPassword());
            return true;
        }
        else return false;
    }




    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
    public Optional<Member> findOne(String memberId) {
        return memberRepository.findById(memberId);
    }
}
