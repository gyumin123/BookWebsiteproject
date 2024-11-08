// 지원 댓글 리포지토리 클래스
package com.book.support;

import org.springframework.data.jpa.repository.JpaRepository;
import com.book.support.Comment;
import com.book.support.SupportPost;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(SupportPost post);
}