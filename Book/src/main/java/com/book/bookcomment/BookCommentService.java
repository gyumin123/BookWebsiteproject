package com.book.bookcomment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookCommentService {
    private final BookCommentRepository bookCommentRepository;

    @Autowired
    public BookCommentService(BookCommentRepository bookCommentRepository) {
        this.bookCommentRepository = bookCommentRepository;
    }

    public void addComment(CommentDTO commentDTO) {
        BookCommentEntity bookCommentEntity = new BookCommentEntity();
        bookCommentEntity.setComment(commentDTO.getComment());
        bookCommentEntity.setBookId(commentDTO.getBookid());
        bookCommentEntity.setPage(commentDTO.getPage());
        bookCommentEntity.setUserid(commentDTO.getUserid());
        bookCommentRepository.save(bookCommentEntity);
    }

    public List<CommentDTO> getCommentsByUserid(UserCommentsDTO userCommentsDTO) {
        List<BookCommentEntity> entities = bookCommentRepository.findBookCommentsByUserid(
                userCommentsDTO.getBookid(),
                userCommentsDTO.getUserid(),
                userCommentsDTO.getPage()
        );

        return convertEntitiesToDTOs(entities);
    }

    public List<CommentDTO> getCommentsByGroupId(GroupCommentDTO groupCommentDTO) {
        List<BookCommentEntity> entities = bookCommentRepository.findBookCommentsByGroupId(
                groupCommentDTO.getBookid(),
                groupCommentDTO.getGroupid(),
                groupCommentDTO.getPage()
        );

        return convertEntitiesToDTOs(entities);
    }

    private List<CommentDTO> convertEntitiesToDTOs(List<BookCommentEntity> entities) {
        List<CommentDTO> comments = new ArrayList<>();
        for (BookCommentEntity entity : entities) {
            CommentDTO dto = new CommentDTO();
            dto.setBookid(entity.getBookId());
            dto.setUserid(entity.getUserid());
            dto.setPage(entity.getPage());
            dto.setComment(entity.getComment());
            comments.add(dto);
        }
        return comments;
    }
}
