package com.book.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SupportComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author;
    private String comment;

    @OneToMany(mappedBy = "supportPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SupportComment> comments = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<SupportComment> getComments() {
        return comments;
    }

    public void setComments(List<SupportComment> comments) {
        this.comments = comments;
    }
}
