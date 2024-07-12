package com.team.project.krh;

import lombok.Data;

@Data
public class StockPage {
    int nowPage=1;
    int startNo, endNo;
    int listSize=9;
    int totSize;
    String findStr; 

    public void compute(){
        endNo=nowPage*listSize;
        startNo=endNo-listSize;
    } 
}
