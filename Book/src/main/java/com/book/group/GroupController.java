package com.book.group;

import com.book.memberjpa.MemberEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createGroup(@RequestBody GroupDTO groupDTO) {
        groupService.createGroup(groupDTO);
        return ResponseEntity.ok("Group created successfully!");
    }

    @GetMapping("/list/{state}")
    public ResponseEntity<List<GroupDTO>> getGroupsByState(@PathVariable Integer state) {
        List<GroupDTO> groups = groupService.getGroupsByState(state);
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/list/{state}/{userid}")
    public ResponseEntity<List<GroupDTO>> getUserGroupsByState(@PathVariable Integer state, @PathVariable String userid) {
        List<GroupDTO> groups = groupService.getUserGroupsByState(userid, state);
        return ResponseEntity.ok(groups);
    }


    @PostMapping("/join/confirm")
    public ResponseEntity<String> joinGroup(@RequestBody JoinRequest joinRequest) {
        groupService.joinGroup(joinRequest.getUserId(), joinRequest.getGroupId());
        return ResponseEntity.ok("Joined group successfully!");
    }

    @GetMapping("/{groupid}")
    public ResponseEntity<GroupDetailDTO> getGroupDetail(@PathVariable Long groupid) {
        GroupDetailDTO groupDetail = groupService.getGroupDetail(groupid);
        return ResponseEntity.ok(groupDetail);
    }
    @PutMapping("/revise/{groupid}")
    public ResponseEntity<String> reviseGroup(@PathVariable Long groupid, @RequestBody GroupDTO groupDTO) {
        groupService.reviseGroup(groupid, groupDTO);
        return ResponseEntity.ok("Group updated successfully!");
    }
    @PostMapping("/join/request")
    public ResponseEntity<String> requestJoinGroup(@RequestBody JoinRequest joinRequest) {
        groupService.requestJoinGroup(joinRequest.getUserId(), joinRequest.getGroupId());
        return ResponseEntity.ok("Join request submitted successfully!");
    }

    @GetMapping("/join/request/{groupid}")
    public ResponseEntity<List<MemberEntity>> getJoinRequests(@PathVariable Long groupid) {
        List<MemberEntity> joinRequests = groupService.getJoinRequests(groupid);
        return ResponseEntity.ok(joinRequests);
    }

    @PostMapping("/join/reject")
    public ResponseEntity<String> rejectJoinRequest(@RequestBody JoinRequest joinRequest) {
        groupService.rejectJoinRequest(joinRequest.getUserId(), joinRequest.getGroupId());
        return ResponseEntity.ok("Join request rejected successfully!");
    }
}
