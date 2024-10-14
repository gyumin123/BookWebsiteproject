package com.book.service;

import com.book.DTO.MailDTO;
import com.book.DTO.UserIdDTO;
import com.book.DTO.UserInfoUpdateDTO;
import com.book.domain.Member;
import com.book.repository.MemberRepository;
import com.book.repository.MemoryMemberRepository;

import java.util.Optional;

public class MemberInfoService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();


    /**
     * 사용자 프로필 이미지 가져오기
     */
    public void getUserImage(UserIdDTO userIdDTO) {
        Member member = findMemberById(userIdDTO.getUserid());
        /**
         *  사용자 이미지를 넘겨주는 함수의 구현 필요
         *  ---데이터베이스 연결
         */
    }


    /**
     * 사용자 정보 재설정
     */
    public void UserInfoUpdate(UserInfoUpdateDTO userInfoUpdateDTO, String userId) {
        Member member = findMemberById(userId);

        /**
         * 사용자 프로필 이미지 설정 구현
         */
        if(userInfoUpdateDTO.getUsername() != null)
            member.setName(userInfoUpdateDTO.getUsername());
        if(userInfoUpdateDTO.getPassword() != null)
            member.setPassword(userInfoUpdateDTO.getPassword());
    }


    /**
     * 사용자 아이디 찾기
     */
    public String findUserId(String username, String email) {
        Member member = findMemberByEmail(email);

        if(member == null || !member.getName().equals(username))
            return null;
        return member.getId();
    }

    /**
     * 임시 비밀번호 전송
     */
    public void resetPassword(String userid) {
        Member member = findMemberById(userid);
        if(member == null) return;

        MailService mailService = new MailService();
        // 임시 비밀번호 생성
        String tempPassword = getTempPassword();

        // 임시 비밀번호로 멤버의 비밀번호를 변경
        member.setPassword(tempPassword);

        MailDTO mail = mailService.createMail(tempPassword, member.getEmail());
        mailService.sendMail(mail);
    }

    /**
     * 사용자 비밀번호 가져오기
     */
    public String getPassword(String userid) {
        Member member = findMemberById(userid);
        if(member == null) return null;

        return member.getPassword();
    }




    // 유저 정보로 멤버를 찾는 메소드
    private Member findMemberByName(String userName) {
        Optional<Member> optionalMember = memberRepository.findByName(userName);
        return optionalMember.orElse(null);
    }

    private Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElse(null);
    }

    private Member findMemberById(String userId) {
        Optional<Member> optionalMember = memberRepository.findById(userId);
        return optionalMember.orElse(null);
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
}
