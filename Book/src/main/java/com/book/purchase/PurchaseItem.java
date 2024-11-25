
package com.book.purchase;

import jakarta.persistence.*;

@Entity
@Table(name = "purchase")
public class PurchaseItem {
    @Id
    private Long id; // 책 아이디

    private String userid; // 유저 아이디
    private String purchaseType; // 대여/소장
    private Integer period; // 기간
    private Double price; // 총 가격

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPurchaseType() {
        return purchaseType;
    }

    public void setPurchaseType(String purchaseType) {
        this.purchaseType = purchaseType;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
