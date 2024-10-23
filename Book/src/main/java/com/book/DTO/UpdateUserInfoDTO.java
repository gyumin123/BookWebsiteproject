package com.book.DTO;

public class UpdateUserInfoDTO {
    private String userid;
    private String profildImg;
    private String username;


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }
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

}
