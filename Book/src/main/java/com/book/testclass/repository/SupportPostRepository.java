package com.book.testclass.repository;

import com.book.testclass.domain.SupportPost;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class SupportPostRepository {
    private static Map<Long, SupportPost> store = new HashMap<>();
    private static long sequence = 0L;

    public SupportPost save(SupportPost post) {
        post.setId(++sequence);
        store.put(post.getId(), post);
        return post;
    }

    public Optional<SupportPost> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public static List<SupportPost> findAll() {
        return new ArrayList<>(store.values());
    }

    public void clearStore() {
        store.clear();
    }
}
