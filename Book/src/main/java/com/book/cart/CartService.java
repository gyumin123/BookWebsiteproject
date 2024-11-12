package com.book.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // 장바구니에 책 추가
    public CartItem addBookToCart(CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    // 장바구니 조회
    public List<CartItem> getCartItems() {
        return cartRepository.findAll();
    }

    // 장바구니에서 책 삭제
    public void removeBookFromCart(Long itemId) {
        cartRepository.deleteById(itemId);
    }
}
