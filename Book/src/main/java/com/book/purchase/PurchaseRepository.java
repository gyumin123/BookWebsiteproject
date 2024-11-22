package com.book.purchase;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<PurchaseItem, Long> {
    Optional<PurchaseItem> findByIdAndUserid(Long id, String userid);
}
