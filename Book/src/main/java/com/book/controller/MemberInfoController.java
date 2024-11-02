package com.book.controller;

import com.book.DTO.UserIdDTO;
import com.book.DTO.UpdateUserInfoDTO;
import com.book.domain.LoginHistory;
import com.book.service.MemberInfoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/user")
public class MemberInfoController {

    private final MemberInfoService memberInfoService;

    @Autowired
    public MemberInfoController(MemberInfoService memberInfoService) {
        this.memberInfoService = memberInfoService;
    }



    //MainBanner
    /**
     * 사용자 상태 확인(로그인 여부 확인)
     */
    @GetMapping("/state")
    public ResponseEntity<String> isLoggedin(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) return ResponseEntity.ok(session.getId()); //로그인 상태일 경우 userid
        else return ResponseEntity.ok(""); //로그인 상태가 아닐 경우 빈 문자열
    }

    /**
     * 사용자 프로필 이미지 가져오기
     */
    @GetMapping("/image")
    public ResponseEntity<String> getUserImage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        String img = memberInfoService.getUserImage(session.getId());
        return ResponseEntity.ok(img);
    }

    /**
     * 로그아웃
     */
    @PostMapping(value = "/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        //세션을 제거한다.
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        //로그아웃 성공
        return ResponseEntity.ok().build();
    }



    //MyHistory
    /**
     * 로그인 기록 총 페이지 수
     */
    @GetMapping("/myhistory/login/totalPage")
    public ResponseEntity<Integer> getTotalLoginPages() {
        return ResponseEntity.ok(1); // 임시 반환값
    }

    /**
     * 로그인 기록을 페이지 별로 가져오는 로직
     */
    @GetMapping("/myhistory/login/{start}/{perpage}")
    public ResponseEntity<List<LoginHistory>> getLoginHistory(@PathVariable int start, @PathVariable int perpage) {
        List<LoginHistory> loginHistoryList = memberInfoService.getLoginHistory(start, perpage);

        return ResponseEntity.ok(loginHistoryList);
    }



    //MyPage
    /**
     * 프로필 이미지와 닉네임 업데이트
     */
    @PostMapping("/revise")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateUserInfoDTO dto) {
        String userid = dto.getUserid();
        String profileImg = dto.getProfildImg();
        String username = dto.getUsername();

        boolean isUpdated = memberInfoService.updateProfile(userid, profileImg, username);
        if (isUpdated) {
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile");
        }
    }

    /**
     * 사용자 이미지 로드
     */
    @PostMapping("/img")
    public ResponseEntity<String> getUserProfileImg(@RequestBody UserIdDTO userIdDTO) {
        String userid = userIdDTO.getUserid();
        String img = memberInfoService.getUserImage(userid);

        return ResponseEntity.ok(img);
    }



    //PurchaseHistory
    /**
     * 구매 내역
     */
//    @GetMapping("/purchase-history/{userid}/{start}/{perPage}")
//    public ResponseEntity<List<PurchaseHistoryResponse>> getPurchaseHistory(
//            @PathVariable String userid,
//            @PathVariable int start,
//            @PathVariable int perPage
//    ) {
//        return null;
//    }

    /**
     * 대여 내역
     */
//    @GetMapping("/rental-history/{userid}/{start}/{perPage}")
//    public ResponseEntity<List<RentalHistoryResponse>> getRentalHistory(
//            @PathVariable String userid,
//            @PathVariable int start,
//            @PathVariable int perPage
//    ) {
//        return null;
//    }
}
