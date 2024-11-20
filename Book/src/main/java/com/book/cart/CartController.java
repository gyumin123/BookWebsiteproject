package com.book.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    // 장바구니에 책 추가
    @PostMapping("/add")
    public ResponseEntity<CartItem> addBookToCart(@RequestBody CartItem cartItem) {
        return ResponseEntity.ok(cartService.addBookToCart(cartItem));
    }

    // 특정 유저의 장바구니 조회
    @GetMapping("/items/{userId}")
    public ResponseEntity<List<CartItem>> getCartItemsByUserid(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartItemsByUserId(userId));
    }

    // 장바구니에서 유저아이디와 책아이디로 삭제
    @DeleteMapping("/{userId}/{itemId}")
    public ResponseEntity<Void> removeBookFromCart(@PathVariable String userId, @PathVariable Long itemId) {
        cartService.removeBookFromCart(userId, itemId);
        return ResponseEntity.ok().build();
    }
}
