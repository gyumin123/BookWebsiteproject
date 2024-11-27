package com.book.groupplan;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupPlanDTO {
    private Long groupId;
    private Long planId;
    private String title;
}
