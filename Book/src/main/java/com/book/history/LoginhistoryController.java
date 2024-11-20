package com.book.history;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class LoginhistoryController {

    private final LoginhistoryService loginhistoryService;

    @Autowired
    public LoginhistoryController(LoginhistoryService loginhistoryService) {
        this.loginhistoryService = loginhistoryService;
    }

    @GetMapping("/api/user/history/login/totalpage/{userid}")
    public ResponseEntity<Integer> getTotalPage(@PathVariable String userid, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("member") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        String userId = session.getAttribute("member").toString();
        return ResponseEntity.ok(loginhistoryService.getTotalPage(userid));

    }

    @GetMapping("/api/user/histroy/login/{userid}/{start}")
    public ResponseEntity<List<Loginhistory>> getLoginPage(@PathVariable String userid, @PathVariable int start, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("member") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        String userId = session.getAttribute("member").toString();
        return ResponseEntity.ok(loginhistoryService.getList(userid, start));
    }
}
