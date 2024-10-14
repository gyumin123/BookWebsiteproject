package com.book.controller;

import com.book.DTO.LoginDTO;
import com.book.DTO.MembershipDTO;
import com.book.DTO.UserIdDTO;
import com.book.domain.Member;
import com.book.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Controller
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }


    /**
     * 회원가입
    */
    @PostMapping(value = "/membership")
    public String membership(@RequestBody MembershipDTO membershipDTO) {
        // 입력받은 정보로 멤버 객체를 만들어 MemberService로 넘긴다.
        memberService.register(membershipDTO); // 회원가입 진행

        return "redirect:/"; // 홈으로 돌아간다.
    }


    /**
     * 로그인
     */
    @PostMapping(value = "/login")
    public String login(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        // 입력받은 정보를 memberService로 넘긴다.
        boolean isLoginSuccessful = memberService.login(loginDTO); // 로그인 진행

        if(isLoginSuccessful) {
            //  request에 세션이 있으면 세션을 반환하고, 없으면 신규 세션을 생성하여 HttpSession session에 담는다.
            HttpSession session = request.getSession();
            session.setAttribute("member",loginDTO.getUserid());
        }

        return "redirect:/"; // 홈으로 이동
    }


    /**
     * 로그아웃
     */
    @PostMapping(value = "/user/logout")
    public String logout(@RequestBody UserIdDTO userIdDTO, HttpServletRequest request) {
        //세션을 제거한다.
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return "redirect:/"; // 홈으로 이동
    }





    /**
     * 사용자 상태 확인(로그인?)
    */
    @GetMapping("/user/states")
    public boolean isLoggedin(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null;
    }

    /**
     * 사용자 조회
     */
    @GetMapping("/api/validID/{userid}")
    public Member UserInformationQuery(@PathVariable("userId") String userid) {
        Optional<Member> member = memberService.findOne(userid);
        return member.orElse(null);
    }

}
