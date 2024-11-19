package com.book.testclass.controller;

import com.book.DTO.SupportCommentDTO;
import com.book.DTO.SupportPostDTO;
import com.book.testclass.domain.SupportComment;
import com.book.testclass.domain.SupportPost;
import com.book.testclass.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/member/support")
public class SupportController {

    private final SupportService supportService;

    @Autowired
    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }


    // 글 목록 조회 (검색어에 따른)
    @GetMapping("/totalSupportpage/{search}")
    public ResponseEntity<Integer> getTotalPages(@PathVariable("search") String search) {
        List<SupportPost> posts = supportService.getPosts(0, search);
        return ResponseEntity.ok(posts.size());
    }

    // 게시물 페이지 번호에 따른 게시글 조회
    @GetMapping("/{page}")
    public ResponseEntity<List<SupportPost>> getPosts(@PathVariable("page") int page) {
        return ResponseEntity.ok(supportService.getPosts(page, ""));
    }

    // 게시물 상세 조회
    @GetMapping("/read/{postId}")
    public ResponseEntity<SupportPost> getPostById(@PathVariable("postId") Long postId) {
        return ResponseEntity.ok(supportService.getPostById(postId));
    }



    // 게시물 작성
    @PostMapping("/write/post")
    public ResponseEntity<SupportPost> createPost(@RequestBody SupportPostDTO postDTO) {
        return ResponseEntity.ok(supportService.writePost(postDTO));
    }

    // 게시물 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        supportService.deletePost(postId);
        return ResponseEntity.ok().build();
    }



    // 댓글 작성
    @PostMapping("/write/comment")
    public ResponseEntity<SupportComment> createComment(@RequestParam Long postId, @RequestBody SupportCommentDTO commentDTO) {
        return ResponseEntity.ok(supportService.writeComment(postId, commentDTO));
    }

    // 댓글 삭제
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        supportService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }

    // 게시물 댓글 조회
    @GetMapping("/comment/{postId}")
    public ResponseEntity<Optional<SupportComment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(supportService.getCommentsByPostId(postId));
    }
}
