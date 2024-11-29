package com.book.purchaseProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PurchaseProgressController {

    @Autowired
    private PurchaseProgressService purchaseProgressService;

    // 구매정보 가져오기
    @GetMapping("/api/purchase/{userid}")
    public ResponseEntity<List<PurchaseDTO>> getPurchaseItem(@PathVariable String userid) {
        return ResponseEntity.ok(purchaseProgressService.getPurchaseItem(userid));
    }

    // 구매정보 전송하기
    @PostMapping("/api/purchase")
    public ResponseEntity<String> getPurchaseItem(@RequestBody PurchaseDTO purchaseDTO) {
        purchaseProgressService.setPurchaseItem(purchaseDTO.getUserid(), purchaseDTO);
        return ResponseEntity.ok("transfer is successful!");
    }
}
