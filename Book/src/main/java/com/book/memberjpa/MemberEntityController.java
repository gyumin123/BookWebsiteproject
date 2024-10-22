package com.book.memberjpa;

import com.book.DTO.MembershipDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@RestController
@RequestMapping("/api/user")
public class MemberEntityController {

    private final MemberEntityService memberEntityService;

    @Autowired
    public MemberEntityController(MemberEntityService memberEntityService) {
        this.memberEntityService = memberEntityService;
    }

    // 기존 회원가입
    @PostMapping("/create")
    public String register(@RequestBody MembershipDTO membershipDTO) {
        memberEntityService.register(membershipDTO);
        return "Member registered successfully!";
    }

    // 사용자 정보 수정 (MembershipDTO 사용)
    @PutMapping("/update")
    public String reviseUser(@RequestBody MembershipDTO membershipDTO) {
        return memberEntityService.reviseUser(membershipDTO);
    }

    // 이미지 업로드 API (POST)
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadUserImage(@RequestParam("userid") String userid, @RequestParam("file") MultipartFile file) {
        try {
            // 이미지 파일을 서버에 저장하고 경로 반환
            String imagePath = memberEntityService.saveUserImage(userid, file);
            return ResponseEntity.ok("Image uploaded successfully! Image path: " + imagePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed!");
        }
    }

    // 이미지 조회 API (GET)
    @GetMapping("/image/{userid}")
    public ResponseEntity<Resource> getUserImage(@PathVariable String userid) {
        try {
            // 이미지 파일을 로드하여 반환
            Resource image = memberEntityService.loadUserImage(userid);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG) // 이미지 형식에 맞게 수정 가능 (JPEG, PNG 등)
                    .body(image);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
