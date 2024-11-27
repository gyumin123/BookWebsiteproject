package com.book.group;

import com.book.memberjpa.MemberEntity;
import com.book.memberjpa.MemberEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final MemberEntityRepository memberRepository;
    private final GroupJoinRequestRepository groupJoinRequestRepository;

    @Autowired
    public GroupService(GroupRepository groupRepository, MemberEntityRepository memberRepository, GroupJoinRequestRepository groupJoinRequestRepository) {
        this.groupRepository = groupRepository;
        this.memberRepository = memberRepository;
        this.groupJoinRequestRepository = groupJoinRequestRepository;
    }

    public void createGroup(GroupDTO groupDTO) {
        GroupEntity group = new GroupEntity();
        group.setGroupName(groupDTO.getGroupName());
        group.setBookId(groupDTO.getBookId());
        group.setStartDate(groupDTO.getStartDate());
        group.setEndDate(groupDTO.getEndDate());
        group.setState(groupDTO.getState());
        group.setLeaderId(groupDTO.getLeaderId());
        group.setAuthority(groupDTO.getAuthority());
        groupRepository.save(group);
    }

    public List<GroupDTO> getGroupsByState(Integer state) {
        List<GroupEntity> groups = groupRepository.findByState(state);
        return groups.stream().map(GroupDTO::new).collect(Collectors.toList());
    }

    public void joinGroup(String userId, Long groupId) {
        MemberEntity member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        member.getGroups().add(group);
        memberRepository.save(member);
    }

    public GroupDetailDTO getGroupDetail(Long groupId) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<MemberEntity> members = group.getMembers();
        return new GroupDetailDTO(group, members);
    }

    @Transactional
    public void reviseGroup(Long groupId, GroupDTO groupDTO) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        group.setGroupName(groupDTO.getGroupName());
        group.setBookId(groupDTO.getBookId());
        group.setStartDate(groupDTO.getStartDate());
        group.setEndDate(groupDTO.getEndDate());
        group.setState(groupDTO.getState());
        group.setLeaderId(groupDTO.getLeaderId());
        group.setAuthority(groupDTO.getAuthority());
        groupRepository.save(group);
    }

    public void requestJoinGroup(String userId, Long groupId) {
        MemberEntity member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        GroupJoinRequest joinRequest = new GroupJoinRequest();
        joinRequest.setUser(member);
        joinRequest.setGroup(group);
        groupJoinRequestRepository.save(joinRequest);
    }

    public List<MemberEntity> getJoinRequests(Long groupId) {
        return groupJoinRequestRepository.findByGroupGroupId(groupId).stream()
                .map(GroupJoinRequest::getUser)
                .collect(Collectors.toList());
    }

    public void rejectJoinRequest(String userId, Long groupId) {
        GroupJoinRequest joinRequest = groupJoinRequestRepository.findByUserIdAndGroupGroupId(userId, groupId)
                .orElseThrow(() -> new RuntimeException("Join request not found"));
        groupJoinRequestRepository.delete(joinRequest);
    }
    public List<GroupDTO> getUserGroupsByState(String userId, Integer state) {
        MemberEntity member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return member.getGroups().stream()
                .filter(group -> group.getState().equals(state))
                .map(GroupDTO::new)
                .collect(Collectors.toList());
    }
}
