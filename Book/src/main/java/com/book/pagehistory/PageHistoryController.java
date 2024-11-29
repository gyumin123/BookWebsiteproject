package com.book.pagehistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PageHistoryController {

    private PageHistoryService pageHistoryService;

    @Autowired
    public PageHistoryController(PageHistoryService pageHistoryService) {
        this.pageHistoryService = pageHistoryService;
    }

    //해당 책의 열람기록 저장하기
    @PostMapping("/api/read/page")
    public ResponseEntity<String> setPageHistory(@RequestBody PageHistoryDTO dto) {
        pageHistoryService.setPage(dto);
        return ResponseEntity.ok("Success");
    }

    //해당 책의 열람 기록 가져오기(개별)
    @GetMapping("/api/read/page/{userid}/{bookid}")
    public ResponseEntity<Integer> getPageHistory(@PathVariable String userid, @PathVariable Long bookid) {
        return ResponseEntity.ok(pageHistoryService.getPage(userid, bookid));
    }

    //해당 책의 열람 기록 가져오기(그룹)
    @GetMapping("/api/read/page/group/{groupid}/{bookid}")
    public ResponseEntity<List<GroupHistoryDTO>> getPageHistoryGroup(@PathVariable("groupid") Long groupid, @PathVariable("bookid") Long bookid) {
        return ResponseEntity.ok(pageHistoryService.getPageGroup(groupid, bookid));
    }

}
