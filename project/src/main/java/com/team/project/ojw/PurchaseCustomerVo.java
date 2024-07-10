package com.team.project.ojw;

import lombok.Data;

@Data
public class PurchaseCustomerVo {
    int p_no;
    String p_productCode;
    String p_productName;
    int p_price;
    int p_ea;
    String p_nal;
    String customerCustomer;
    String customerBusinessNumber;
    String customerAddress;
    String customerEmail;
    String customerClientName;
}
