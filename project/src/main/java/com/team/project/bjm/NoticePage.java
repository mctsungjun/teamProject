package com.team.project.bjm;

import lombok.Data;

@Data
public class NoticePage {
    int nowPage;
    int startNo;
    int endNo;
    int totSize;
    int listSize = 10;
    int blockSize = 5;
    String findStr;

    int totPage,startPage,endPage;

    public void compute() {
        endNo = nowPage * listSize;
        startNo = endNo - listSize;
        
        totPage = (int) Math.ceil(totSize / (double) listSize);

        startPage = ((nowPage - 1) / blockSize) * blockSize + 1;
        endPage = startPage + blockSize - 1;
        
        if (endPage > totPage) {
            endPage = totPage;
        }
    }
}