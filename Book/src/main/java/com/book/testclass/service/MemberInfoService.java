package com.book.testclass.service;

import com.book.testclass.domain.LoginHistory;
import com.book.testclass.domain.Member;
import com.book.testclass.repository.MemberRepository;
import com.book.testclass.repository.MemoryMemberRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberInfoService {

    private final MemberRepository memberRepository = new MemoryMemberRepository();


    //MainBanner
    //MyPage
    /**
     * 사용자 프로필 이미지 가져오기
     */
    public String getUserImage(String userid) {
        Member member = findMemberById(userid);
        String img = "";
        /**
         *
         */
        return img;
    }


    //MyHistory
    /**
     * 로그인 기록을 페이지 별로 가져오는 로직
     */
    public List<LoginHistory> getLoginHistory(int start, int perpage) {
        List<LoginHistory> loginHistoryList = new ArrayList<>();
        /**
         *
         */
        return loginHistoryList;
    }



    //MyPage
    /**
     * 프로필 이미지와 닉네임 업데이트
     */
    public boolean updateProfile(String userid, String profileImg, String username) {
        Member member = findMemberById(userid);
        //if(profileImg != null) member.setprofileImg(profileImg);
        if(username != null) member.setName(username);
        return true;
    }




    private Member findMemberById(String userId) {
        Optional<Member> optionalMember = memberRepository.findById(userId);
        return optionalMember.orElse(null);
    }
}
