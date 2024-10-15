package com.book.repository;

import com.book.domain.SupportComment;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class SupportCommentRepository {
    private static Map<Long, SupportComment> store = new HashMap<>();
    private static long sequence = 0L;

    public SupportComment save(SupportComment comment) {
        store.put(comment.getId(), comment);
        return comment;
    }

    public Optional<SupportComment> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public void clearStore() {
        store.clear();
    }

    public void deleteById(Long commentId) {
    }
}
