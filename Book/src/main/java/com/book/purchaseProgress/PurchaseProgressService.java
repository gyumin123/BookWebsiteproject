package com.book.purchaseProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseProgressService {
    private final PurchaseProgressRepository progressRepository;

    @Autowired
    public PurchaseProgressService(PurchaseProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public List<PurchaseDTO> getPurchaseItem(String userid) {
        return progressRepository.getListByUserid(userid);
    }

    // 리스트를 저장하도록 변경
    public void setPurchaseItems(String userid, List<PurchaseDTO> purchaseItems) {
        progressRepository.save(userid, purchaseItems);
    }
}
