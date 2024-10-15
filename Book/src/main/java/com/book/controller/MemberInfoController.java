package com.book.controller;

import com.book.DTO.UserIdDTO;
import com.book.DTO.UserInfoUpdateDTO;
import com.book.service.MemberInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

@Controller
@RequestMapping("/api/user")
public class MemberInfoController {

    private final MemberInfoService memberInfoService;

    @Autowired
    public MemberInfoController(MemberInfoService memberInfoService) {
        this.memberInfoService = memberInfoService;
    }


    /**
     * 사용자 프로필 이미지 가져오기
     */
    @PostMapping(value = "/image")
    public void getUserImage(@RequestBody UserIdDTO userIdDTO) {
        memberInfoService.getUserImage(userIdDTO);
    }


    /**
     * 사용자 정보 재설정
     * 받아온 값 중 null이 아닌 경우만 수정
     */
    @PostMapping(value = "/revise")
    public String userInfoUpdate(@RequestBody UserInfoUpdateDTO userInfoUpdateDTO) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        memberInfoService.UserInfoUpdate(userInfoUpdateDTO, userId);

        return "redirect:/"; // 홈으로 이동
    }


    /**
     * 사용자 비밀번호 찾기
     */
    @PostMapping(value = "/find/pwd/{userid}")
    public void findPassword(@PathVariable("userid") String userid) {
        memberInfoService.resetPassword(userid);

    }


    /**
     * 사용자 아이디 찾기
     */
    @GetMapping("/find/id/{username}/{email}")
    public String findUserId(@PathVariable("username") String username, @PathVariable("email") String email) {

        return memberInfoService.findUserId(username, email);
    }

    /**
     * 사용자 비밀번호 가져오기
     */
    @GetMapping("/get/pwd/{userid}")
    public String getPassword(@PathVariable("userid") String userid) {

        return memberInfoService.getPassword(userid);
    }

}
