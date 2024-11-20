package com.book.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/support")
public class SupportPostController {
    @Autowired
    private SupportPostService supportPostService;

    // 게시글 작성
    @PostMapping("/post")
    public ResponseEntity<SupportPost> createPost(@RequestBody SupportPost post) {
        return ResponseEntity.ok(supportPostService.createPost(post));
    }

    // 게시글 삭제
    @DeleteMapping("/{postid}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postid) {
        supportPostService.deletePost(postid);
        return ResponseEntity.ok().build();
    }

    // 게시글 조회
    @GetMapping("/{postid}")
    public ResponseEntity<SupportPost> getPostById(@PathVariable Long postid) {
        Optional<SupportPost> post = supportPostService.getPostById(postid);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    // 해당 범위의 게시글 가져오기
    @GetMapping("/{search}/{start}")
    public ResponseEntity<List<SupportPost>> getPostBySearch(@PathVariable String search, @PathVariable int start) {
        return ResponseEntity.ok(supportPostService.getPostsByStart(start));
    }

    // 총 페이지
    @GetMapping("/totalSupportpage/{search}")
    public ResponseEntity<Integer> totalSupportpage(@PathVariable String search) {
        return ResponseEntity.ok(supportPostService.getPostsTotalPages());
    }
}
