package com.book.bookcomment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCommentsDTO {
    private Long bookid;
    private String userid;
    private int page;
}
