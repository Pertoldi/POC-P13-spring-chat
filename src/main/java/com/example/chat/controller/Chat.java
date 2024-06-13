package com.example.chat.controller;

import com.example.chat.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class Chat {

  @MessageMapping("/send")
  @SendTo("/topic/messages")
  public Message send(Message message) throws Exception {
    return message;
  }
}
