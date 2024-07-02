package com.team.project.csy;

import lombok.Data;

@Data
public class CsyBoardCommentVo {
    int sno, post_sno, reply_sno;
    String id, nal, content;
}
