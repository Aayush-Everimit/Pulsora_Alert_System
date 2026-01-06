package com.projects.Pulsora.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailService {
    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendMail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            log.info("Simple Mail Sent to {} " , to);
        }
        catch (Exception e) {
            log.error("Failed to send simple mail to {}: {}", to, e.getMessage());        }
    }

    @Async
    public void sendHtmlMail(String to, String subject, String HTMLcontent) {
        try {
            MimeMessage  message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);


            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(HTMLcontent, true);

            mailSender.send(message);
            log.info("Sent HTML email to {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send HTML email to {}: {}", to, e.getMessage());
        }
    }
}
