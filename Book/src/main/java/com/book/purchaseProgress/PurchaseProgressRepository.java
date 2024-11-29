package com.book.purchaseProgress;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PurchaseProgressRepository {
    private static Map<String, List<PurchaseDTO>> store = new HashMap<>();

    public List<PurchaseDTO> save(String userid, PurchaseDTO purchase) {
        store.putIfAbsent(userid, new ArrayList<>()); // 없으면 새 리스트 생성 후 추가
        store.get(userid).add(purchase);
        return store.get(userid);
    }

    public List<PurchaseDTO> getListByUserid(String userid) {
        return store.getOrDefault(userid, new ArrayList<>());
    }
}
