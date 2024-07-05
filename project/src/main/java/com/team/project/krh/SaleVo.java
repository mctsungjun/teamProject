package com.team.project.krh;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SaleVo {
    @Id
    int sno;
    String id;
    String ProductCode;
    String nal;
    String ProductName;
    int ea;
    int price;
    int amt;
    String sessionId;

    //amt 계산용
    public void compute(){
        amt=ea*price;
    }

}
