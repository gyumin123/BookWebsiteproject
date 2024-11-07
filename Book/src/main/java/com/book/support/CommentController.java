package com.book.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private SupportPostService postService;

    // 댓글 작성
    @PostMapping("/write")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentid}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentid) {
        commentService.deleteComment(commentid);
        return ResponseEntity.ok().build();
    }

    // 댓글 조회
    @GetMapping("/{postid}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postid) {
        Optional<SupportPost> post = postService.getPostById(postid);
        return post.map(value -> ResponseEntity.ok(commentService.getCommentsByPost(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
