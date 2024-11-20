package com.book.communityjpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommunityService {
    private final LoginHistoryRepository loginHistoryRepository;

    @Autowired
    public CommunityService(LoginHistoryRepository loginHistoryRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
    }

    // Get Total Number of Login Pages
    public int getTotalLoginPages(int perPage) {
        int totalRecords = (int) loginHistoryRepository.count();
        return (int) Math.ceil((double) totalRecords / perPage);
    }

    // Get Login History by Page
    public List<LoginHistory> getLoginHistory(int start, int perPage) {
        Pageable pageable = PageRequest.of(start, perPage);
        return loginHistoryRepository.findAll(pageable).getContent();
    }

    // Add Login History
    public void addLoginHistory(LoginHistory loginHistory) {
        loginHistoryRepository.save(loginHistory);
    }
}