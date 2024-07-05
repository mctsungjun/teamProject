package com.team.project.csy;

import lombok.Data;

@Data
public class CsyBoardVo {
    int sno, likes, hits;
    String title, content, id, nal;

    // * DETAIL PAGE를 위한 추가 부분 * //
    boolean isLikedByMe = false;
    String viewersId;

    // // * 페이징 처리를 위한 추가 부분 * //
    // int numOfPosts;
}