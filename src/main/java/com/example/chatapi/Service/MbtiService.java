package com.example.chatapi.Service;

import com.example.chatapi.DTO.MbtiDTO;
import com.example.chatapi.DTO.UserDTO;
import com.example.chatapi.Entity.MBTI.MBTIInfoEntity;

import java.util.List;

public interface MbtiService {

    MBTIInfoEntity register(MbtiDTO mbtiDTO);

    List<MBTIInfoEntity> getList();

    boolean addMbti(UserDTO userDTO, MbtiDTO mbtiDTO) throws RuntimeException;

    List<MbtiDTO> getAllMbtiList() throws RuntimeException;

    List<MbtiDTO> getUserMbtiList(String username) throws RuntimeException;

    void assignRepresentMBTI(String username, String mbtiCode);

    void releaseRepresentMBTI(String username);

}
