package com.example.chatapi.Entity.User;

import com.example.chatapi.DTO.UserDTO;
import com.example.chatapi.Entity.Authority.UserAuthorityJoinEntity;
import com.example.chatapi.Entity.MBTI.UserMbtiJoinEntity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "USER")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    // Serializable : 분산환경, 직렬화하여 외부 전송?

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Id
    @Column(length = 50)
    private String username;

    @Column
    private String password;

    @Column
    private String email;

    @Column(length = 50, unique = true)
    private String nickname;

    @Column(columnDefinition = "boolean default true")
    private boolean activate;

    @Column(name = "reg_date", updatable = false)
    @CreationTimestamp
    private LocalDateTime regDate;

    @Column(name = "update_date")
    @UpdateTimestamp
    private LocalDateTime updateDate;

//    @ManyToMany // 실무에서 권장하지않는 방법. (@OneToMany로 관계 변경 후, 조인 테이블을 엔티티로 승격시켜 @ManyToOne 관계로 설정)
//    @JoinTable(
//            name = "user_authority",
//            joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id"), @JoinColumn(name = "username", referencedColumnName = "username")},
//            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
//    private Set<AuthorityEntity> authorities;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<UserAuthorityJoinEntity> authorities;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<UserMbtiJoinEntity> mbtiList;

//    @ToString.Exclude
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private Set<OAuth2UserEntity> oauth2Type;


    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setActivate(boolean activate) {
        this.activate = activate;
    }

    public void setRegDate(LocalDateTime regDate) {
        this.regDate = regDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public void setAuthorities(Set<UserAuthorityJoinEntity> authorities) {
        this.authorities = authorities;
    }

    public void setMbtiList(Set<UserMbtiJoinEntity> mbtiList) {
        this.mbtiList = mbtiList;
    }

//    public void setOauth2Type(Set<OAuth2UserEntity> oauth2Type) {
//        this.oauth2Type = oauth2Type;
//    }

    public static UserEntity convertToUserEntity(UserDTO dto) {
        return UserEntity.builder()
//                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .nickname(dto.getPassword())
                .activate(dto.isActivate())
                .build();
    }
}
