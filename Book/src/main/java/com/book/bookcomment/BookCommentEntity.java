package com.book.bookcomment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "BookComment")
@Getter
@Setter
public class BookCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String userid;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private int page;
}
