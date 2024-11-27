package com.book.group;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupJoinRequestRepository extends JpaRepository<GroupJoinRequest, Long> {
    List<GroupJoinRequest> findByGroupGroupId(Long groupId);
    Optional<GroupJoinRequest> findByUserIdAndGroupGroupId(String userId, Long groupId);
}
