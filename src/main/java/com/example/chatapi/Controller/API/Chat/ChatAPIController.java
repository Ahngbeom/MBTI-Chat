package com.example.chatapi.Controller.API.Chat;

import com.example.chatapi.DTO.ChatRoomDTO;
import com.example.chatapi.Service.ChatService;
import com.example.chatapi.Service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@PreAuthorize("isAuthenticated()")
public class ChatAPIController {

    private final UserService userService;
    private final ChatService chatService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/listOfAll")
    public ResponseEntity<List<ChatRoomDTO>> getListOfAllChatRooms() {
        return ResponseEntity.ok(chatService.getListOfAllChatRooms());
    }

    @GetMapping("/list")
    public ResponseEntity<List<ChatRoomDTO>> getListOfAllChatRoomsUserHasJoined(Principal principal) {
        return ResponseEntity.ok(chatService.getListOfAllChatRoomsUserHasJoined(userService.getUserInfo(principal.getName()).getUsername()));
    }

    @PostMapping("/create")
    public ResponseEntity<Boolean> createChatRoom(Principal principal, @RequestBody ChatRoomDTO chatRoom) {
        log.warn(chatRoom.toString());
        return ResponseEntity.ok(chatService.createChatRoom(principal.getName(), chatRoom));
    }

    @GetMapping("/join-availability/{roomName}")
    public ResponseEntity<String> joinChatRoomAvailability(@PathVariable String roomName, Principal principal) {
        if (!chatService.checkAlreadyJoined(roomName, principal.getName())) {
            if (!chatService.joinChatRoomAvailability(roomName, principal.getName())) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Your MBTI code does not allow access to this chat room.");
            }
        }
        return ResponseEntity.ok("Success");
    }

}