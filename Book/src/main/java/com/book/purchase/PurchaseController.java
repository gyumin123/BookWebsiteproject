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
    @PostMapping("/confirm")
    public ResponseEntity<PurchaseItem> addPurchaseItem(@RequestBody PurchaseItem purchaseItem) {
        return ResponseEntity.ok(purchaseService.addPurchaseItem(purchaseItem));
    }

    // 책 아이디와 유저 정보로 구매 정보 조회
    @GetMapping("/{id}/{userid}")
    public ResponseEntity<PurchaseItem> getPurchaseItemByIdAndUser(@PathVariable Long id, @PathVariable String userid) {
        Optional<PurchaseItem> purchaseItem = purchaseService.getPurchaseItemByIdAndUser(id, userid);
        return purchaseItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 구매 정보 삭제
    @DeleteMapping("/{userid}/{itemId}")
    public ResponseEntity<Void> removePurchaseItem(@PathVariable String userid, @PathVariable Long itemId) {
        purchaseService.removePurchaseItem(userid, itemId);
        return ResponseEntity.ok().build();
    }
}