package com.book.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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



    // 게시글 모두 가져오기
    public List<SupportPost> getAllPosts() {
        return supportRepository.findAll();
    }
    // 게시글 일부 가져오기
    public List<SupportPost> getPostsByStart(int start) {
        List<SupportPost> postList = getAllPosts();
        return postList.subList(start, postList.size());
    }
    // 총 페이지 수
    public int getPostsTotalPages() {
        return supportRepository.findAll().size() % 10 + 1;
    }
}
