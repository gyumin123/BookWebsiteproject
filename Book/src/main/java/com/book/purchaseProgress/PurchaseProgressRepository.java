package com.book.purchaseProgress;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PurchaseProgressRepository {
    private static Map<String, List<PurchaseDTO>> store = new HashMap<>();


    // 새로운 리스트로 덮어쓰기
    public List<PurchaseDTO> save(String userid, List<PurchaseDTO> purchases) {
        store.put(userid, purchases); // 기존 리스트 덮어쓰기
        return purchases;
    }

    public List<PurchaseDTO> getListByUserid(String userid) {
        return store.getOrDefault(userid, new ArrayList<>());
    }
}
