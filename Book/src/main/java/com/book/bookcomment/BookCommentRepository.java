package com.book.bookcomment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookCommentRepository extends JpaRepository<BookCommentEntity, Long> {

    @Query("SELECT c FROM BookCommentEntity c " +
            "JOIN MemberEntity m ON c.userid = m.id " +
            "JOIN m.groups g " +
            "WHERE g.groupId = :groupId AND c.bookId = :bookId AND c.page = :page")
    List<BookCommentEntity> findBookCommentsByGroupId(
            @Param("bookId") Long bookId,
            @Param("groupId") Long groupId,
            @Param("page") int page
    );

    @Query("SELECT c FROM BookCommentEntity c " +
            "WHERE c.bookId = :bookId AND c.userid = :userid AND c.page = :page")
    List<BookCommentEntity> findBookCommentsByUserid(
            @Param("bookId") Long bookId,
            @Param("userid") String userid,
            @Param("page") int page
    );
}
