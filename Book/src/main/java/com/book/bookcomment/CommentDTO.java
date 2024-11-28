package com.book.bookcomment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private Long bookid;
    private String userid;
    private int page;
    private String comment;
}
