
package com.book.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


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

    // 특정 유저의 장바구니 조회
    public List<CartItem> getCartItemsByUserId(String userid) {
        return cartRepository.findByUserid(userid);
    }

    // 장바구니에서 책 삭제방법
    public void removeBookFromCart(String userId, Long itemId) {
        CartItem cartItem = cartRepository.findById(itemId).orElse(null);
        if (cartItem != null && cartItem.getUserid().equals(userId)) {
            cartRepository.deleteById(itemId);
        }
    }
}
