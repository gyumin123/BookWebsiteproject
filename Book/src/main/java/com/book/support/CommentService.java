package com.book.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.book.support.CommentRepository;
import com.book.support.SupportPost;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // 댓글 작성
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // 댓글 조회
    public List<Comment> getCommentsByPostAndUser(SupportPost post, Long userid) {
        return commentRepository.findAllByPostAndUserid(post, userid);
    }
}
