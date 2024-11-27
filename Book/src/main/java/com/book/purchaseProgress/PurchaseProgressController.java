package com.book.purchaseProgress;

import com.book.DTO.PurchaseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PurchaseProgressController {

    @Autowired
    private PurchaseProgressService purchaseProgressService;

    // 구매정보 가져오기
    @GetMapping("/api/purchase/{id}/{userid}")
    public ResponseEntity<PurchaseDTO> getPurchaseItem(@PathVariable Long id, @PathVariable String userid) {
        PurchaseDTO item = purchaseProgressService.getPurchaseItem(id, userid);
        return ResponseEntity.ok(item);
    }

    // 구매정보 전송하기
    @PostMapping("/api/purchase")
    public ResponseEntity<String> getPurchaseItem(@RequestBody PurchaseDTO purchaseDTO, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("member") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        String userid = session.getAttribute("member").toString();
        purchaseProgressService.setPurchaseItem(userid, purchaseDTO);
        return ResponseEntity.ok("transfer is successful!");
    }
}
