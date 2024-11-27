package com.book.group;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRequest {
    private String userId;
    private Long groupId;
}
