package com.book.bookcomment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookCommentController {
    private final BookCommentService bookCommentService;

    @Autowired
    public BookCommentController(BookCommentService bookCommentService) {
        this.bookCommentService = bookCommentService;
    }

    @PostMapping("/api/read/comment/write")
    public ResponseEntity<String> addComment(@RequestBody CommentDTO commentDTO) {
        bookCommentService.addComment(commentDTO);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/api/read/comment/user")
    public ResponseEntity<List<CommentDTO>> userComments(@RequestBody UserCommentsDTO userCommentsDTO) {
        List<CommentDTO> comments = bookCommentService.getCommentsByUserid(userCommentsDTO);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/api/read/comment/group")
    public ResponseEntity<List<CommentDTO>> getCommentsByGroup(@RequestBody GroupCommentDTO groupCommentDTO) {
        List<CommentDTO> comments = bookCommentService.getCommentsByGroupId(groupCommentDTO);
        return ResponseEntity.ok(comments);
    }
}

