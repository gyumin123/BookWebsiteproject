package com.book.history;

import com.book.purchase.PurchaseItem;
import com.book.purchase.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseHistoryService {
    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseHistoryService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    // 총 페이지
    public int getTotalPage(String userid) {
        return (int) Math.ceil((double) purchaseRepository.findByUserid(userid).size() / 5);
    }

    // 구매 내역 가져오기
    public List<PurchaseItem> getHistoryList(String userid, int start) {
        List<PurchaseItem> historyList = purchaseRepository.findByUserid(userid);
        return historyList.subList(start, historyList.size());
    }
}
