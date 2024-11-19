package com.book.history;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class LoginhistoryRepository {
    private static Map<String, List<Loginhistory>> store = new HashMap<>();
    private static long sequence = 0L;

    public List<Loginhistory> save (String userid, List<Loginhistory> loginhistoryList) {
        store.put(userid, loginhistoryList);
        return loginhistoryList;
    }

    public List<Loginhistory> getListByUserid(String userid) {
        return store.getOrDefault(userid, new ArrayList<>());
    }
}
