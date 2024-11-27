package com.book.groupplan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group/plan")
public class GroupPlanController {
    private final GroupPlanService groupPlanService;

    @Autowired
    public GroupPlanController(GroupPlanService groupPlanService) {
        this.groupPlanService = groupPlanService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createGroupPlan(@RequestBody GroupPlanDTO groupPlanDTO) {
        groupPlanService.createGroupPlan(groupPlanDTO.getGroupId(), groupPlanDTO.getTitle());
        return ResponseEntity.ok("Group plan created successfully!");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteGroupPlan(@RequestBody GroupPlanDTO groupPlanDTO) {
        groupPlanService.deleteGroupPlan(groupPlanDTO.getGroupId(), groupPlanDTO.getPlanId());
        return ResponseEntity.ok("Group plan deleted successfully!");
    }

    @GetMapping("/{groupid}")
    public ResponseEntity<List<GroupPlanEntity>> getGroupPlans(@PathVariable Long groupid) {
        List<GroupPlanEntity> groupPlans = groupPlanService.getGroupPlans(groupid);
        return ResponseEntity.ok(groupPlans);
    }

    @PostMapping("/write")
    public ResponseEntity<String> writeContent(@RequestBody GroupPlanContentDTO contentDTO) {
        groupPlanService.writeContent(contentDTO.getUserId(), contentDTO.getGroupId(), contentDTO.getPlanId(), contentDTO.getContent());
        return ResponseEntity.ok("Content written successfully!");
    }

    @GetMapping("/content/{groupid}/{planid}")
    public ResponseEntity<List<GroupPlanContent>> getGroupPlanContents(@PathVariable Long groupid, @PathVariable Long planid) {
        List<GroupPlanContent> contents = groupPlanService.getGroupPlanContents(groupid, planid);
        return ResponseEntity.ok(contents);
    }
}
