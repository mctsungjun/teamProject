package com.team.project.ojw;

import java.util.List;

import lombok.Data;

@Data
public class ProductVo {
    String productCode;
    String productName;
    int price;
    String spec;
    String comment;
    String explain;
    String photo;
    List<PhotoVo> photos;
}
