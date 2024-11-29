package com.book.history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoginhistoryService {

    private final LoginhistoryRepository loginhistoryRepository;
    private static long sequence = 0L;

    @Autowired
    public LoginhistoryService(LoginhistoryRepository loginhistoryRepository) {
        this.loginhistoryRepository = loginhistoryRepository;
    }

    // 총 페이지
    public int getTotalPage(String userid) {
        List<Loginhistory> historyList = loginhistoryRepository.findByUserid(userid);
        return (int) Math.ceil((double) historyList.size() / 5);
    }

    // 시작 번호부터
    public List<Loginhistory> getList(String userid, int start) {
        List<Loginhistory> historyList = loginhistoryRepository.findByUserid(userid);
        return historyList.subList(start, historyList.size());
    }

    public void saveHistory(String userid, String ipAddr) {
        Loginhistory loginhistory = new Loginhistory();
        loginhistory.setUserid(userid);
        loginhistory.setIp(ipAddr);
        loginhistory.setDate(LocalDate.now());

        loginhistoryRepository.save(loginhistory);
    }
}
