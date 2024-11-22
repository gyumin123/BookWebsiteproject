package com.book.DTO;

public class PurchaseDTO {
    private Long id; // 책 고유 아이디
    private String userid;
    private String purchaseType;
    private Integer period;
    private Double price;

    public String getPurchaseType() {
        return purchaseType;
    }

    public void setPurchaseType(String purchaseType) {
        this.purchaseType = purchaseType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUserid() { return userid; }

    public void setUserid(String userid) { this.userid = userid; }
}
