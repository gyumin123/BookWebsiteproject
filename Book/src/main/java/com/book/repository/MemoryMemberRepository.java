package com.book.repository;

import com.book.domain.Member;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Repository
public class MemoryMemberRepository implements MemberRepository {
    private static Map<String, Member> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Member save(Member member) {
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Member> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return store.values().stream()
                .filter(member -> member.getEmail().equals(email))
                .findAny();
    }

    @Override
    public Optional<Member> findByName(String userName) {
        return store.values().stream()
                .filter(member -> member.getName().equals(userName))
                .findAny();
    }

    public void clearStore() {
        store.clear();
    }
}
