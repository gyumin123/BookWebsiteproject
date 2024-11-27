package com.book.groupplan;

import com.book.group.GroupEntity;
import com.book.group.GroupRepository;
import com.book.memberjpa.MemberEntity;
import com.book.memberjpa.MemberEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupPlanService {
    private final GroupPlanRepository groupPlanRepository;
    private final GroupPlanContentRepository groupPlanContentRepository;
    private final GroupRepository groupRepository;
    private final MemberEntityRepository memberRepository;

    @Autowired
    public GroupPlanService(GroupPlanRepository groupPlanRepository,
                            GroupPlanContentRepository groupPlanContentRepository,
                            GroupRepository groupRepository,
                            MemberEntityRepository memberRepository) {
        this.groupPlanRepository = groupPlanRepository;
        this.groupPlanContentRepository = groupPlanContentRepository;
        this.groupRepository = groupRepository;
        this.memberRepository = memberRepository;
    }

    public void createGroupPlan(Long groupId, String title) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        GroupPlanEntity groupPlan = new GroupPlanEntity();
        groupPlan.setGroup(group);
        groupPlan.setTitle(title);
        groupPlanRepository.save(groupPlan);
    }

    public void deleteGroupPlan(Long groupId, Long planId) {
        GroupPlanEntity groupPlan = groupPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Group plan not found"));
        if (!groupPlan.getGroup().getGroupId().equals(groupId)) {
            throw new RuntimeException("Group plan does not belong to this group");
        }
        groupPlanRepository.delete(groupPlan);
    }

    public List<GroupPlanEntity> getGroupPlans(Long groupId) {
        return groupPlanRepository.findByGroupGroupId(groupId);
    }

    public void writeContent(String userId, Long groupId, Long planId, String content) {
        MemberEntity user = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        GroupPlanEntity plan = groupPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Group plan not found"));

        GroupPlanContent groupPlanContent = new GroupPlanContent();
        groupPlanContent.setUser(user);
        groupPlanContent.setGroup(group);
        groupPlanContent.setPlan(plan);
        groupPlanContent.setContent(content);
        groupPlanContentRepository.save(groupPlanContent);
    }

    public List<GroupPlanContent> getGroupPlanContents(Long groupId, Long planId) {
        return groupPlanContentRepository.findByGroupGroupIdAndPlanPlanId(groupId, planId);
    }
}
