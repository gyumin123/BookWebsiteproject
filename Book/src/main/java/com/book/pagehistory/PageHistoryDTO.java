package com.book.pagehistory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageHistoryDTO {
    private Long bookid;
    private String userid;
    private int page;
}
