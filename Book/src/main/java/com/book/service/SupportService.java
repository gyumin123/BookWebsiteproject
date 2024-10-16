package com.book.service;


import com.book.DTO.SupportCommentDTO;
import com.book.DTO.SupportPostDTO;
import com.book.domain.SupportComment;
import com.book.domain.SupportPost;
import com.book.repository.SupportCommentRepository;
import com.book.repository.SupportPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportService {

    @Autowired
    private SupportPostRepository postRepository;

    @Autowired
    private SupportCommentRepository commentRepository;

    // 글 목록 조회
    public List<SupportPost> getPosts(int page, String search) {
        return SupportPostRepository.findAll();
    }

    // 게시물 상세 조회
    public SupportPost getPostById(Long postId) {
        return postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
    }

    // 글 쓰기
    public SupportPost writePost(SupportPostDTO postDTO) {
        SupportPost post = new SupportPost();
        post.setAuthor(postDTO.getAuthor());
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setPublic(postDTO.getState());
        post.setPassword(postDTO.getPassword());

        return postRepository.save(post);
    }

    // 댓글 조회
    public Optional<SupportComment> getCommentsByPostId(Long postId) {
        return commentRepository.findById(postId);
    }

    // 댓글 쓰기
    public SupportComment writeComment(Long postId, SupportCommentDTO commentDTO) {
        SupportPost post = getPostById(postId);

        SupportComment comment = new SupportComment();

        //comment.setSupportPost(post);
        comment.setAuthor(commentDTO.getAuthor());
        comment.setComment(commentDTO.getComment());

        return commentRepository.save(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // 게시물 삭제
    public void deletePost(Long postId) {
        commentRepository.deleteById(postId);
    }
}

