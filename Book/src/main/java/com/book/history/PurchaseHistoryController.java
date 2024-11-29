package com.book.history;

import com.book.purchase.PurchaseItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PurchaseHistoryController {
    @Autowired
    private PurchaseHistoryService purchaseHistoryService;

    // 구매 내역 총페이지
    @GetMapping("/api/user/history/purchase/totalpage/{userid}")
    public ResponseEntity<Integer> totalPage(@PathVariable String userid) {
        return ResponseEntity.ok(purchaseHistoryService.getTotalPage(userid));
    }

    // 구매 내역 가져오기
    @GetMapping("/api/user/history/purchase/{userid}/{start}")
    public ResponseEntity<List<PurchaseItem>> page(@PathVariable String userid, @PathVariable int start) {
        return ResponseEntity.ok(purchaseHistoryService.getHistoryList(userid, start));
    }
}
