package com.book.purchaseProgress;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseDTO {
    private Long id; // 책 고유 아이디
    private String userid;
    private String purchaseType;
    private Integer period;
    private Double price;
}
