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

    public void setPurchaseItem(String userid, PurchaseDTO purchaseItem) {
        progressRepository.save(userid, purchaseItem);
    }
}
