package com.book.DTO;

public class UserInfoUpdateDTO {
    private String profildImg;
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfildImg() {
        return profildImg;
    }

    public void setProfildImg(String profildImg) {
        this.profildImg = profildImg;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
