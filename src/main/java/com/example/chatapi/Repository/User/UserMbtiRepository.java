package com.example.chatapi.Repository.User;

import com.example.chatapi.Entity.MBTI.UserMbtiJoinEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMbtiRepository extends JpaRepository<UserMbtiJoinEntity, Long> {

    //    @Query("select distinct UserMbtiJoinEntity.mbti, UserMbtiJoinEntity.user from UserMbtiJoinEntity left outer join UserEntity on UserEntity.id = UserMbtiJoinEntity.user.id where UserMbtiJoinEntity.user.id = ?1")
    List<UserMbtiJoinEntity> findAllByUser_Username(String username);

    Optional<UserMbtiJoinEntity> findByMbti_CodeAndUser_Username(String code, String username);

    Optional<UserMbtiJoinEntity> findByUser_UsernameAndRepresentIsTrue(String username);

    boolean existsByUser_Username(String username);

    boolean existsByMbti_Code(String code);

    boolean existsByMbti_CodeAndUser_Username(String code, String username);
//    boolean existsByCodeAndUser_id(String code, Long userId);

}
