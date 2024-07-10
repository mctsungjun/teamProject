package com.team.project.ojw;

import lombok.Data;

@Data
public class PurchaseVo {
    int no;
    String productCode;
    String productName;
    int price;
    int ea;
    String nal;
    String customer;
}
