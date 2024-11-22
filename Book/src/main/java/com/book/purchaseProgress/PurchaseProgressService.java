package com.book.purchaseProgress;

import com.book.DTO.PurchaseDTO;
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

    public PurchaseDTO getPurchaseItem(Long id, String userid) {
        List<PurchaseDTO> list = progressRepository.getListByUserid(userid);
        for (PurchaseDTO purchaseDTO : list) {
            if (purchaseDTO.getId().equals(id)) {
                return purchaseDTO;
            }
        }
        return null;
    }
    public void setPurchaseItem(String userid, PurchaseDTO purchaseItem) {
        progressRepository.getListByUserid(userid).add(purchaseItem);
        progressRepository.save(userid, purchaseItem);
    }
}
