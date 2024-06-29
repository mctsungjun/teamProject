package com.team.project.csy;

import lombok.Data;

@Data
public class CsyBoardListPageVo {
    int startNo = 0, endNo;
	int listSize = 1;
	int blockSize=5;
	int startPage = 1, endPage;
	int totSize, totPage;
	int nowPage = 1;
	
	String findStr;
	String limitType;

	public CsyBoardListPageVo() {
		pageCompute();
	}

	public CsyBoardListPageVo(int totSize, int nowPage) {
		this.totSize = totSize;
		this.nowPage = nowPage;
		pageCompute();
	}

	public void pageCompute() {
		totPage = (int) Math.ceil(totSize / (double) listSize);
		endNo = listSize * nowPage;
		startNo = endNo - listSize;
		if (endNo > totSize)
			endNo = totSize;

		endPage = (int) Math.ceil(nowPage / (double) blockSize) * blockSize;
		startPage = endPage - blockSize + 1;
		if (endPage > totPage)
			endPage = totPage;
	}
}
