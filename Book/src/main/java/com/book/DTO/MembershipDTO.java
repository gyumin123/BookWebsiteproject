package com.book.DTO;

public class MembershipDTO {

    private String userid;
    private String password;
    private String phoneNumber;
    private String email;
    private String name;

    // ChangePasswordDTO 멤버 변수 추가
    private ChangePasswordDTO changePasswordDTO;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // ChangePasswordDTO getter와 setter 추가
    public ChangePasswordDTO getChangePasswordDTO() {
        return changePasswordDTO;
    }

    public void setChangePasswordDTO(ChangePasswordDTO changePasswordDTO) {
        this.changePasswordDTO = changePasswordDTO;
    }
}
