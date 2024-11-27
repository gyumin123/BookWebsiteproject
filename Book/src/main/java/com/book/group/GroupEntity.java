package com.book.group;

import com.book.memberjpa.MemberEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "GroupTable")
@Getter
@Setter
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(nullable = false)
    private String groupName;

    @Column(nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Integer state; // 0: 시작 전, 1: 진행 중, 2: 완료

    @Column(nullable = false)
    private String leaderId;


    @Column(nullable = false)
    private String authority;

    @ManyToMany(mappedBy = "groups")
    @JsonBackReference // 직렬화 시 이 필드는 제외됨
    private List<MemberEntity> members = new ArrayList<>();
}
