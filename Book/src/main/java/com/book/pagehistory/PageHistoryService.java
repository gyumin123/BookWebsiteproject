package com.book.pagehistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageHistoryService {
    private PageHistoryRepository pageHistoryRepository;

    @Autowired
    public PageHistoryService(PageHistoryRepository pageHistoryRepository) {
        this.pageHistoryRepository = pageHistoryRepository;
    }

    public void setPage(PageHistoryDTO dto) {
        PageHistoryEntity entity = pageHistoryRepository.findByBookIdAndUserid(dto.getBookid(), dto.getUserid())
                .orElseGet(() -> {
                    PageHistoryEntity newEntity = new PageHistoryEntity();
                    newEntity.setUserid(dto.getUserid());
                    newEntity.setBookId(dto.getBookid());
                    newEntity.setPage(dto.getPage()); // 새로 생성된 경우에도 초기 페이지 설정
                    return newEntity;
                });

        // 페이지 값 업데이트
        entity.setPage(dto.getPage());

        // 엔티티 저장
        pageHistoryRepository.save(entity);

    }


    public int getPage(String userid, Long bookid) {
        return pageHistoryRepository.findByBookIdAndUserid(bookid, userid)
                .map(PageHistoryEntity::getPage)
                .orElse(1); // 기본값 0 반환
    }

    public List<GroupHistoryDTO> getPageGroup(Long groupid, Long bookid) {
        return pageHistoryRepository.findPagesByGroupId(bookid, groupid);
    }
}
