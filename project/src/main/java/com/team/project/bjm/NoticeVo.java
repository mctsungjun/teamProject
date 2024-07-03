package com.team.project.bjm;

import java.util.List;

import lombok.Data;

@Data
public class NoticeVo {
    String id, title, content, writer, nal, category, tag, modifynal, correctorId;
    int sno, hit;
    List<NoticeAtt> attFiles;
}
