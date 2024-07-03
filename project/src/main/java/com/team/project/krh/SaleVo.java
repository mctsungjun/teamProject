package com.team.project.krh;
import lombok.Data;

@Data
public class SaleVo {
    int sno;
    String CustomerId;
    String ProductCode;
    String nal;
    String ProductName;
    int ea;
    int price;
    int amt;
    String SaleList;
    String photo;
    //String addressDetail;
    //String email;
    //String phone;
    //String name;

    //amt 계산용
    public void compute(){
        amt=ea*price;
    }

}
