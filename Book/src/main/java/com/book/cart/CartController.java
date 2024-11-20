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

    // 장바구니에서 책 삭제
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeBookFromCart(@PathVariable Long itemId) {
        cartService.removeBookFromCart(itemId);
        return ResponseEntity.ok().build();
    }
}
