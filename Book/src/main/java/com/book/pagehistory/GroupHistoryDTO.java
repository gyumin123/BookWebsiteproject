package com.book.pagehistory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupHistoryDTO {
    private String userid;
    private int page;

    public GroupHistoryDTO(String userid, int page) {
        this.userid = userid;
        this.page = page;
    }
}
