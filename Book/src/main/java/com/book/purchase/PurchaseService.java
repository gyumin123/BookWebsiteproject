package com.book.purchase;

import com.book.purchaseProgress.PurchaseProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final PurchaseProgressRepository purchaseProgressRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, PurchaseProgressRepository purchaseProgressRepository) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseProgressRepository = purchaseProgressRepository;
    }

    // 구매 정보 추가
    public PurchaseItem addPurchaseItem(PurchaseItem purchaseItem) {
        purchaseProgressRepository.getListByUserid(purchaseItem.getUserid()).clear();
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