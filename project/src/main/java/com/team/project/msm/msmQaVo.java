package com.team.project.msm;

import lombok.Data;

@Data
public class msmQaVo {
    String qusId;
    String qusCon;
    String qusDate;
    String qusTitle;
    int qusNum;
    String ansId;
    String ansCon;
    String ansDate;
    String photo; //포토는 여유가 안되면 삭제 예정 ><
}
