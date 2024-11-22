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

    // 책 아이디와 유저 정보로 구매 정보 조회
    public Optional<PurchaseItem> getPurchaseItemByIdAndUser(Long id, String userid) {
        return purchaseRepository.findByIdAndUserid(id, userid);
    }

    // 구매 정보 삭제
    public void removePurchaseItem(String userid, Long itemId) {
        PurchaseItem purchaseItem = purchaseRepository.findById(itemId).orElse(null);
        if (purchaseItem != null && purchaseItem.getUserid().equals(userid)) {
            purchaseRepository.deleteById(itemId);
        }
    }
}