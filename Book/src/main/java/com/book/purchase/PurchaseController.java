package com.book.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    // 구매 정보 추가
    @PostMapping("/add")
    public ResponseEntity<PurchaseItem> addPurchaseItem(@RequestBody PurchaseItem purchaseItem) {
        return ResponseEntity.ok(purchaseService.addPurchaseItem(purchaseItem));
    }

    // 구매 정보 조회
    @GetMapping("/items")
    public ResponseEntity<List<PurchaseItem>> getPurchaseItems() {
        return ResponseEntity.ok(purchaseService.getPurchaseItems());
    }

    // 구매 정보 삭제
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removePurchaseItem(@PathVariable Long itemId) {
        purchaseService.removePurchaseItem(itemId);
        return ResponseEntity.ok().build();
    }
}
