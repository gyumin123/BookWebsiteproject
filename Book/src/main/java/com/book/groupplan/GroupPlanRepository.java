package com.book.groupplan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupPlanRepository extends JpaRepository<GroupPlanEntity, Long> {
    List<GroupPlanEntity> findByGroupGroupId(Long groupId);
}
