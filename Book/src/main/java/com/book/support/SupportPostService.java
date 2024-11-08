package com.book.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class SupportPostService {
    private final SupportRepository supportRepository;

    @Autowired
    public SupportPostService(SupportRepository supportRepository) {
        this.supportRepository = supportRepository;
    }

    // 게시글 작성
    public SupportPost createPost(SupportPost post) {
        return supportRepository.save(post);
    }

    // 게시글 삭제
    public void deletePost(Long postId) {
        supportRepository.deleteById(postId);
    }

    // 게시글 조회
    public Optional<SupportPost> getPostById(Long postId) {
        return supportRepository.findById(postId);
    }
}
