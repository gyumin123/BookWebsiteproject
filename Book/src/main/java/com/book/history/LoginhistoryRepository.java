package com.book.history;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginhistoryRepository extends JpaRepository<Loginhistory, Long> {
    @Query("select l FROM Loginhistory l " +
            "WHERE l.userid = :userid ")
    List<Loginhistory> findByUserid(
            @Param("userid") String userid
    );
}
