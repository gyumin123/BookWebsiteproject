package com.book.group;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 생성하기 위해 추가
public class GroupDTO {
    private Long groupId;
    private String groupName;
    private Long bookId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer state;
    private String leaderId;
    private String authority;


    public GroupDTO(GroupEntity group) {
        this.groupId = group.getGroupId();
        this.groupName = group.getGroupName();
        this.bookId = group.getBookId();
        this.startDate = group.getStartDate();
        this.endDate = group.getEndDate();
        this.state = group.getState();
        this.leaderId = group.getLeaderId();
        this.authority = group.getAuthority();
    }
}
