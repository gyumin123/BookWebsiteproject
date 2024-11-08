package com.book.communityjpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    // 로그인 기록 총 페이지 수 가져오기
    @GetMapping("/myhistory/login/totalpage")
    public ResponseEntity<Integer> getTotalLoginPages() {
        return ResponseEntity.ok(communityService.getTotalLoginPages(10));
    }

    // 로그인 기록 페이지별로 가져오기
    @GetMapping("/myhistory/login/{start}/{perpage}")
    public ResponseEntity<List<LoginHistory>> getLoginHistory(@PathVariable int start, @PathVariable int perpage) {
        return ResponseEntity.ok(communityService.getLoginHistory(start, perpage));
    }

    // 로그인 기록 추가하기
    @PostMapping("/myhistory/login/add")
    public ResponseEntity<Void> addLoginHistory(@RequestBody LoginHistory loginHistory) {
        communityService.addLoginHistory(loginHistory);
        return ResponseEntity.ok().build();
    }
}