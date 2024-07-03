package com.team.project.krh;
import lombok.Data;

@Data
public class SaleVo {
    int sno;
    String id;
    String ProductCode;
    String nal;
    String ProductName;
    int ea;
    int price;
    int amt;


    //amt 계산용
    public void compute(){
        amt=ea*price;
    }

}
