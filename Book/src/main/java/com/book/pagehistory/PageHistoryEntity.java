package com.book.pagehistory;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PageHistory")
@Getter
@Setter
public class PageHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pageHistoryId;

    @Column(nullable = false)
    private String userid;

    @Column(nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private int page;
}
