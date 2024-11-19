package com.book.memberjpa;

import com.book.DTO.ChangePasswordDTO;
import com.book.DTO.LoginDTO;
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

    // 로그인 인증 메서드
    public boolean authenticateUser(LoginDTO loginDTO) {
        Optional<MemberEntity> member = memberEntityRepository.findById(loginDTO.getUserid());
        return member.isPresent() && member.get().getPassword().equals(loginDTO.getPassword());
    }

    // 로그인 상태 확인 (세션이나 토큰으로 구현 가능)
    public boolean isUserLoggedIn() {
        // 현재 로그인 상태를 확인하는 로직 필요 (세션이나 토큰을 이용해 확인)
        return true; // 예시로 항상 true 반환
    }

    // 로그아웃 메서드
    public void logoutUser() {
        // 로그아웃 처리 로직 추가 (예: 세션 만료 또는 토큰 무효화)
    }

    // 아이디 찾기
    public String findUserIdByUsernameAndEmail(String name, String email) {
        Optional<MemberEntity> member = memberEntityRepository.findByNameAndEmail(name, email);
        return member.map(MemberEntity::getId).orElse(null);
    }

    // 임시 비밀번호 전송 (임시 비밀번호 생성 후 이메일 발송 로직 추가 가능)
    public boolean sendTemporaryPassword(String userid) {
        Optional<MemberEntity> member = memberEntityRepository.findById(userid);
        if (member.isPresent()) {
            // 임시 비밀번호 생성 및 이메일 전송 로직 추가
            return true;
        }
        return false;
    }

    // 비밀번호 가져오기 (비밀번호는 보안상 평문으로 가져오지 않는 것이 좋음)
    public String getPassword(String userid) {
        Optional<MemberEntity> member = memberEntityRepository.findById(userid);
        return member.map(MemberEntity::getPassword).orElse(null);
    }

    @Transactional
    public boolean changePassword(ChangePasswordDTO changePasswordDTO) {
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(changePasswordDTO.getUserid());
        if (optionalMember.isPresent()) {
            MemberEntity member = optionalMember.get();
            if (member.getPassword().equals(changePasswordDTO.getOldPassword())) {
                member.setPassword(changePasswordDTO.getNewPassword());
                memberEntityRepository.save(member);
                return true;
            }
        }
        return false;
    }
    @Transactional
    public boolean changeNickname(String userid, String newNickname) {
        // 사용자를 조회
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(userid);
        if (optionalMember.isPresent()) {
            // 닉네임 변경
            MemberEntity member = optionalMember.get();
            member.setName(newNickname); // 새로운 닉네임 설정
            memberEntityRepository.save(member); // 변경 사항 저장
            return true;
        }
        return false; // 사용자가 없는 경우
    }


    // 닉네임 조회 로직 추가
    public String getNickname(String userid) {
        Optional<MemberEntity> optionalMember = memberEntityRepository.findById(userid);
        return optionalMember.map(MemberEntity::getName).orElse(null);
    }

    // 아이디 중복 체크
    public boolean isUserIdAvailable(String userid) {
        return !memberEntityRepository.existsById(userid);
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
    // 구독 추가
    public void subscribe(String userId) {
        Optional<MemberEntity> member = memberEntityRepository.findById(userId);
        member.ifPresent(m -> {
            m.setSubscribe(true);
            memberEntityRepository.save(m);
        });
    }

    // 회원 정보 조회
    public Optional<MemberEntity> getMemberById(String userId) {
        return memberEntityRepository.findById(userId);
    }
}

