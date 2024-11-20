package com.book.history;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
        List<Loginhistory> historyList = loginhistoryRepository.getListByUserid(userid);
        return (int) Math.ceil((double) historyList.size() / 5);
    }

    // 시작 번호부터
    public List<Loginhistory> getList(String userid, int start) {
        List<Loginhistory> historyList = loginhistoryRepository.getListByUserid(userid);
        return historyList.subList(start, historyList.size());
    }

    public void saveHistory(String userid, String ipAddr) {
        List<Loginhistory> list = loginhistoryRepository.getListByUserid(userid);

        if (list == null) {
            list = new ArrayList<>();
        }

        Loginhistory loginhistory = new Loginhistory();
        LocalDate now = LocalDate.now();

        loginhistory.setId(++sequence);
        loginhistory.setDate(now);
        loginhistory.setIp(ipAddr);

        list.add(loginhistory);

        loginhistoryRepository.save(userid, list);
    }
}
