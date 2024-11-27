package com.book.groupplan;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupPlanContentDTO {
    private String userId;
    private Long groupId;
    private Long planId;
    private String content;
}
