package com.book.group;

import com.book.memberjpa.MemberEntity;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
@Getter
@Setter
public class GroupDetailDTO {
    private Long groupId;
    private String groupName;
    private Long bookId;
    private String startDate;
    private String endDate;
    private Integer state;
    private List<MemberEntity> participants;
    private String leaderId;
    private String authority;

    public GroupDetailDTO(GroupEntity group, List<MemberEntity> members) {
        this.groupId = group.getGroupId();
        this.groupName = group.getGroupName();
        this.bookId = group.getBookId();
        this.startDate = group.getStartDate().toString();
        this.endDate = group.getEndDate().toString();
        this.state = group.getState();
        this.participants = members;
        this.leaderId = group.getLeaderId();
        this.authority = group.getAuthority();
    }
}