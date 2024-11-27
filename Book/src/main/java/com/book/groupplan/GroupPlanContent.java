package com.book.groupplan;

import com.book.group.GroupEntity;
import com.book.memberjpa.MemberEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "GroupPlanContent")
@Getter
@Setter
public class GroupPlanContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private MemberEntity user;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private GroupEntity group;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private GroupPlanEntity plan;

    @Column(nullable = false)
    private String content;
}
