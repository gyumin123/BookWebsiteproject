package com.book.pagehistory;

import com.book.bookcomment.BookCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PageHistoryRepository extends JpaRepository<PageHistoryEntity, Long>{
    Optional<PageHistoryEntity> findByBookIdAndUserid(Long bookId, String userid);

    @Query("SELECT new com.book.pagehistory.GroupHistoryDTO(p.userid, p.page) " +
            "FROM PageHistoryEntity p " +
            "JOIN MemberEntity m ON p.userid = m.id " +
            "JOIN m.groups g " +
            "WHERE g.groupId = :groupId AND p.bookId = :bookId")
    List<GroupHistoryDTO> findPagesByGroupId(
            @Param("bookId") Long bookId,
            @Param("groupId") Long groupId
    );

}
