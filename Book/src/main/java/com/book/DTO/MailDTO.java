package com.book.DTO;

public class MailDTO {
    private String from;
    private String to;
    private String title;
    private String message;

    public MailDTO(String from, String to, String title, String s) {
        this.from = from;
        this.to = to;
        this.title = title;
        this.message = s;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
