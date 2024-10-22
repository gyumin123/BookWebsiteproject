package com.book.memberjpa;

import com.book.DTO.MembershipDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
public class MemberEntityService {

    private final MemberEntityRepository memberEntityRepository;
    private final Path imageStoragePath = Paths.get("path/to/store/images"); // 이미지 저장 경로 설정

    @Autowired
    public MemberEntityService(MemberEntityRepository memberEntityRepository) {
        this.memberEntityRepository = memberEntityRepository;
    }

    // 기존 회원가입 메서드
    public void register(MembershipDTO membershipDTO) {
        MemberEntity member = new MemberEntity();
        member.setId(membershipDTO.getUserid());
        member.setPassword(membershipDTO.getPassword());
        member.setName(membershipDTO.getName());
        member.setPhoneNumber(membershipDTO.getPhoneNumber());
        member.setEmail(membershipDTO.getEmail());
        member.setVoucher(0); // 기본 값 설정
        memberEntityRepository.save(member);
    }

    // 사용자 정보 수정 메서드(MembershipDTO 사용)
    @Transactional
    public String reviseUser(MembershipDTO membershipDTO) {
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(membershipDTO.getUserid());
        if (optionalMember.isPresent()) {
            MemberEntity member = optionalMember.get();
            member.setPassword(membershipDTO.getPassword());
            member.setName(membershipDTO.getName());
            member.setPhoneNumber(membershipDTO.getPhoneNumber());
            member.setEmail(membershipDTO.getEmail());
            member.setVoucher(0); // 필요에 따라 수정 가능
            memberEntityRepository.save(member);
            return "User information updated successfully!";
        } else {
            return "User not found!";
        }
    }

    // 사용자 이미지 저장 메서드
    public String saveUserImage(String userid, MultipartFile file) throws IOException {
        String fileName = userid + "_" + file.getOriginalFilename();
        Path filePath = imageStoragePath.resolve(fileName);

        // 저장 경로에 디렉토리가 없으면 생성
        Files.createDirectories(imageStoragePath);

        // 파일을 서버에 저장
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // DB에 사용자 이미지 경로 업데이트 (절대 경로가 아닌 상대 경로 저장)
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(userid);
        if (optionalMember.isPresent()) {
            MemberEntity member = optionalMember.get();
            // 중복된 경로 없이 저장
            member.setProfileImage(fileName); // 이미지 경로를 엔티티에 저장 (절대 경로 대신 파일 이름)
            memberEntityRepository.save(member);
        }

        return filePath.toString();
    }

    // 사용자 이미지 로드 메서드
    public Resource loadUserImage(String userid) throws IOException {
        // 사용자 정보에서 이미지 경로를 찾아 이미지 반환
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(userid);
        if (optionalMember.isPresent()) {
            String imageFileName = optionalMember.get().getProfileImage();
            Path filePath = imageStoragePath.resolve(imageFileName);
            return new UrlResource(filePath.toUri());
        } else {
            throw new RuntimeException("Image not found for user: " + userid);
        }
    }

}
