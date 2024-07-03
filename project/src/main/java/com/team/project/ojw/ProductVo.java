package com.team.project.ojw;

import java.util.List;

import lombok.Data;

@Data
public class ProductVo {
    int no;
    String productCode;
    String productName;
    int price;
    String spec;
    String comment;
    String explanation;
    String photo;
    String nal;
    List<ojw_PhotoVo> photos;
}
