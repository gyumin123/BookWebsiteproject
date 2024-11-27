package com.book.memberjpa;

import com.book.group.GroupEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Member")
@Getter
@Setter
public class MemberEntity {
    @Id
    private String id;

    private String password;
    private String name;
    private String phoneNumber;
    private String email;
    private int voucher;
    private String profileImage;
    private Boolean subscribe;

    @ManyToMany
    @JoinTable(
            name = "MemberGroup",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    @JsonBackReference // 직렬화 시 이 필드는 제외됨
    private List<GroupEntity> groups = new ArrayList<>();
}
