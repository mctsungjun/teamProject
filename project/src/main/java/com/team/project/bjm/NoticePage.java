package com.team.project.bjm;

import lombok.Data;

@Data
public class NoticePage {
    int nowPage;
    int startNo;
    int endNo;
    int totSize;
    int listSize = 4;
    String findStr;

    public void compute(){
        endNo = nowPage * listSize;
        startNo = endNo - listSize;
    }
}