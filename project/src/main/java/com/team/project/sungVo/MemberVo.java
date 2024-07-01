package com.team.project.sungVo;

import java.util.List;

import lombok.Data;

@Data
public class MemberVo {
    
    String id;
    String naverId;
    String kakaoId;
    String name;
    String email;
    String gender;
    String roadAddress;
    String addressDetail;
    String birthday;
    String phone1;
    String password;
    String email2;
    String phone2;
    String phone3;
    String jibunAddress;
    String photo; //대표사진
    List<PhotoVo> photos;
    
}
