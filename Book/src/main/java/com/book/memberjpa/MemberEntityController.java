package com.book.memberjpa;

import com.book.DTO.MembershipDTO;
import com.book.DTO.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class MemberEntityController {

    private final MemberEntityService memberEntityService;

    @Autowired
    public MemberEntityController(MemberEntityService memberEntityService) {
        this.memberEntityService = memberEntityService;
    }

    // 로그인 (POST: /api/login)
    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        boolean isAuthenticated = memberEntityService.authenticateUser(loginDTO);
        return isAuthenticated ?
                ResponseEntity.ok("Login successful!") :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed!");
    }

    // 로그인 상태 확인 (GET: /api/user/states)
    @GetMapping("/api/user/states")
    public ResponseEntity<String> getLoginStatus() {
        boolean isLoggedIn = memberEntityService.isUserLoggedIn();
        return isLoggedIn ?
                ResponseEntity.ok("User is logged in") :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
    }

    // 로그아웃 (POST: /api/user/logout)
    @PostMapping("/api/user/logout")
    public ResponseEntity<String> logout() {
        memberEntityService.logoutUser();
        return ResponseEntity.ok("User logged out successfully!");
    }

    // 아이디 찾기 (GET: /api/user/find/iD/{username}/{email})
    @GetMapping("/api/user/find/iD/{username}/{email}")
    public ResponseEntity<String> findUserId(@PathVariable String username, @PathVariable String email) {
        String userId = memberEntityService.findUserIdByUsernameAndEmail(username, email);
        return userId != null ?
                ResponseEntity.ok("User ID: " + userId) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // 임시 비밀번호 전송 (POST: /api/user/find/pwd/{userid})
    @PostMapping("/api/user/find/pwd/{userid}")
    public ResponseEntity<String> sendTemporaryPassword(@PathVariable String userid) {
        boolean isSent = memberEntityService.sendTemporaryPassword(userid);
        return isSent ?
                ResponseEntity.ok("Temporary password sent!") :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // 비밀번호 가져오기 (GET: /api/user/get/pwd/{userid})
    @GetMapping("/api/user/get/pwd/{userid}")
    public ResponseEntity<String> getPassword(@PathVariable String userid) {
        String password = memberEntityService.getPassword(userid);
        return password != null ?
                ResponseEntity.ok("Password: " + password) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // 아이디 중복 체크하기 (GET: /api/validID/{userid})
    @GetMapping("/api/validID/{userid}")
    public ResponseEntity<String> checkUserIdAvailability(@PathVariable String userid) {
        boolean isAvailable = memberEntityService.isUserIdAvailable(userid);
        return isAvailable ?
                ResponseEntity.ok("User ID is available") :
                ResponseEntity.status(HttpStatus.CONFLICT).body("User ID is already taken");
    }

    // 기존 회원가입 (POST: /api/user/membership)
    @PostMapping("/api/user/membership")
    public String register(@RequestBody MembershipDTO membershipDTO) {
        memberEntityService.register(membershipDTO);
        return "Member registered successfully!";
    }

    // 사용자 정보 수정 (PUT: /api/user/revise)
    @PutMapping("/api/user/revise")
    public String reviseUser(@RequestBody MembershipDTO membershipDTO) {
        return memberEntityService.reviseUser(membershipDTO);
    }

    // 이미지 업로드 (POST: /api/user/uploadImage)
    @PostMapping("/api/user/uploadImage")
    public ResponseEntity<String> uploadUserImage(@RequestParam("userid") String userid, @RequestParam("file") MultipartFile file) {
        try {
            String imagePath = memberEntityService.saveUserImage(userid, file);
            return ResponseEntity.ok("Image uploaded successfully! Image path: " + imagePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed!");
        }
    }

    // 이미지 조회 (GET: /api/user/image/{userid})
    @GetMapping("/api/user/image/{userid}")
    public ResponseEntity<Resource> getUserImage(@PathVariable String userid) {
        try {
            Resource image = memberEntityService.loadUserImage(userid);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(image);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
