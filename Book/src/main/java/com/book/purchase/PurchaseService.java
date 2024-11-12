package com.book.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    // 구매 정보 추가
    public PurchaseItem addPurchaseItem(PurchaseItem purchaseItem) {
        return purchaseRepository.save(purchaseItem);
    }

    // 구매 정보 조회
    public List<PurchaseItem> getPurchaseItems() {
        return purchaseRepository.findAll();
    }

    // 구매 정보 삭제
    public void removePurchaseItem(Long itemId) {
        purchaseRepository.deleteById(itemId);
    }
}