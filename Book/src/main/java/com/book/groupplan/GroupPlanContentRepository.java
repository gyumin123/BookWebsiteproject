package com.book.groupplan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupPlanContentRepository extends JpaRepository<GroupPlanContent, Long> {
    List<GroupPlanContent> findByGroupGroupIdAndPlanPlanId(Long groupId, Long planId);
}
