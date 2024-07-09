package com.team.project.bjm;

import lombok.Data;

@Data
public class NoticePage {
    int nowPage; // 현재 페이지
    int startNo; // 시작 번호
    int endNo; // 끝 번호
    int totSize; // 전체 레코드 수
    int listSize = 10; // 페이지당 레코드 수
    int blockSize = 5; // 최대 페이지 수
    String findStr; // 검색어

    int totPage,startPage,endPage;

    public void compute() {
        endNo = nowPage * listSize;
        startNo = endNo - listSize;
        
        // 전체 페이지 수 계산
        totPage = (int) Math.ceil(totSize / (double) listSize);

        // 한 블록의 시작 페이지와 끝 페이지 계산
        startPage = ((nowPage - 1) / blockSize) * blockSize + 1;
        endPage = startPage + blockSize - 1;
        
        // 마지막 페이지 번호가 전체 페이지 수보다 클 수 없음
        if (endPage > totPage) {
            endPage = totPage;
        }
    }
}