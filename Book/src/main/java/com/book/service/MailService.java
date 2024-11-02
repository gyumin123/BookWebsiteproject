package com.book.service;

import com.book.DTO.MailDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    private MailSender mailSender;
    private static final String title = "임시 비밀번호 전송 메일입니다.";
    private static final String message = "회원님의 임시 비밀번호는 다음과 같습니다. 로그인 후 반드시 비밀번호를 변경해주세요.\n";

    private String from;

    public MailDTO createMail(String tempPassword, String to) {
        from = to;
        MailDTO mailDTO = new MailDTO(from, to, title, message + tempPassword);
        return mailDTO;
    }


    public void sendMail(MailDTO mailDTO) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(mailDTO.getTo());
        mailMessage.setSubject(mailDTO.getTitle());
        mailMessage.setText(mailDTO.getMessage());
        mailMessage.setFrom(mailDTO.getFrom());
        mailMessage.setReplyTo(mailDTO.getFrom());

        mailSender.send(mailMessage);
    }
}
