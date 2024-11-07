package com.book.controller;

import com.book.DTO.LoginDTO;
import com.book.DTO.MembershipDTO;
import com.book.DTO.UpdatePasswordDTO;
import com.book.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/api/test")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }


    //FindID
    /**
     * 사용자 아이디 찾기
     */
    @GetMapping("/member/find/id/{username}/{email}")
    public ResponseEntity<String> findUserId(@PathVariable("username") String username, @PathVariable("email") String email) {
        String userid = memberService.findUserId(username, email);

        if(userid == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        else return ResponseEntity.ok(userid);
    }



    //FindPWD
    /**
     * 사용자 비밀번호 찾기
     */
    @GetMapping("/member/validID/{userid}")
    public ResponseEntity<String> findPassword(@PathVariable String userid) {
        if(memberService.findOne(userid).isPresent()) {
            return ResponseEntity.ok("Valid ID");
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid ID");
    }

    @PostMapping(value = "/member/find/pwd/{userid}")
    public ResponseEntity<String> sendTempPassword(@PathVariable String userid) {
        boolean isUserFound = memberService.resetPassword(userid);

        if(isUserFound) return ResponseEntity.ok("Send temporary password");
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }



    //Login
    /**
     * 로그인
     */
    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        // 입력받은 정보를 memberService로 넘긴다.
        boolean isLoginSuccessful = memberService.login(loginDTO); // 로그인 진행

        if(isLoginSuccessful) {
            //  request에 세션이 있으면 세션을 반환하고, 없으면 신규 세션을 생성하여 HttpSession session에 담는다.
            HttpSession session = request.getSession();
            session.setAttribute("member",loginDTO.getUserid());

            return ResponseEntity.ok("Login successful");
        }
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }



    //membership
    /**
     * 회원가입
     */
    @PostMapping(value = "/usermembership")
    public ResponseEntity<String> membership(@RequestBody MembershipDTO membershipDTO) {
        // 입력받은 정보로 멤버 객체를 만들어 MemberService로 넘긴다.
        String userId = memberService.register(membershipDTO); // 회원가입 진행

        if(userId != null) return ResponseEntity.ok("Membership created successfully");
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create membership");
    }

    @GetMapping("/membervalidID/{userid}")
    public ResponseEntity<String> checkUserId(@PathVariable String userid) {
         if(memberService.findOne(userid).isPresent()) return ResponseEntity.ok("Valid ID");
         else return ResponseEntity.status(HttpStatus.CONFLICT).body("User ID already exists");
    }



    //SetPwd
    /**
     * 비밀번호 조회
     */
    @GetMapping("/member/get/pwd/{userid}")
    public ResponseEntity<String> getPassword(@PathVariable String userid) {
        String pw = memberService.getPassword(userid);
        if(pw != null) return ResponseEntity.ok(pw);
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    /**
     * 비밀번호 변경
     */
//    @PostMapping("/user/revise")
//    public ResponseEntity<String> changePassword(@RequestBody UpdatePasswordDTO updatePasswordDTO, HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        boolean isUpdated = memberService.updatePassword(updatePasswordDTO, session.getId());
//
//        if (isUpdated) {
//            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경에 실패했습니다.");
//        }
//    }
}
