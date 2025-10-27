package com.projects.Pulsora.Service;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService
{
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleEmail(String toEmail, String s, String body)
    {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("brad.schneider24@ethereal.email");
            message.setTo(toEmail);
            message.setSubject(s);
            message.setText(body);
            mailSender.send(message);
            System.out.println("Mail Sent Successfully to " + toEmail);
        }
        catch (Exception e) {
            System.err.println("Error while Sending Mail: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
