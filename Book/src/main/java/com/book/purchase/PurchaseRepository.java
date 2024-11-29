package com.book.purchase;

import com.book.history.Loginhistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<PurchaseItem, Long> {
    Optional<PurchaseItem> findByIdAndUserid(Long id, String userid);

    // 유저 아이디로 찾은 레코드들을 리스트 형태로 반환
    @Query("select p from PurchaseItem p "+
            "WHERE p.userid = :userid ")
    List<PurchaseItem> findByUserid(@Param("userid") String userid);
}
