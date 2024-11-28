package com.book.bookcomment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GroupCommentDTO {
    private Long bookid;
    private Long groupid;
    private int page;
}

