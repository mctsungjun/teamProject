package com.team.project.bjm;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

@Component
public class NoticeDao {
    SqlSession session;

    // public Map<String, Object> noticeList(NoticePage page){
    //     session = new MyFactory().getSession();
    //     Map<String, Object> map = new HashMap<>();
    //     // List<NoticeVo> list =null;
    //     // int totSize = session.selectOne("notice.totSize",page.getFindStr());
    //     // page.setTotSize(totSize);
    //     // page.paging();
    //     // map.put("page",page);
    //     // map.put("list", list);
    //     session.close();
    //     return map;
    // }
}
