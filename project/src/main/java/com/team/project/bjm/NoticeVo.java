package com.team.project.bjm;

import lombok.Data;

@Data
public class NoticeVo {
    String id, title, content, writer, nal, category, tag, modifynal, correctorId;
    int hit;
}
