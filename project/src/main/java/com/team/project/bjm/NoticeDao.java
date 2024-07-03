package com.team.project.bjm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class NoticeDao {
    SqlSession session;

    // search,list dao
    public List<NoticeVo> noticeList(NoticePage page,NoticeVo vo){
        session = new MyFactory().getSession();
        // Controller에서 List로 반환해서 Map이 필요할까?
        
        List<NoticeVo> list =null;
        int totSize = session.selectOne("notice.totSize",page.getFindStr());
        page.setTotSize(totSize); // 페이징

        list = session.selectList("notice.search",page);
        page.compute(); // NoticePage의 compute()메서드로 페이지처리
        
        session.close();
        return list;
    }
    public Map<String, Object> noticeView(Integer sno){
        session = new MyFactory().getSession();
        Map<String, Object> map = new HashMap<>();
        NoticeVo vo = session.selectOne("notice.view", sno);
        List<NoticeAtt> attFiles = session.selectList("notice.view",sno);
        map.put("vo", vo);
        map.put("attFiles",attFiles);
        session.close();
        return map;
    }
    public String noticeRegisterR(NoticeVo vo, List<NoticeAtt> attFiles) {
        session = new MyFactory().getSession();
        String msg = "";
        System.out.println("Dao"+vo);
        // System.out.println("Dao"+vo.getAttFiles());
        int cnt = session.insert("notice.post", vo);
        int cntAtt = 0;
    
    
        if (vo.getAttFiles() != null && vo.getAttFiles().size() > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("pSno", vo.getSno());
            map.put("attFiles", attFiles);
            cntAtt = session.insert("notice.postAtt", map); // 첨부 파일 등록
        }
    
        if (cnt > 0) { //  && cntAtt == attFiles.size()) {
            session.commit();
        } else {
            session.rollback();
            msg = "ERROR";
        }
    
        session.close();
        return msg;
    }
    
    
    // 삭제 dao
    // public String noticeDelete(Integer sno){
    //     int cnt = session.delete("notice.delete", sno);
    //     String msg = "";
    //     if(cnt>0){
    //         msg = "삭제 성공";
    //         session.commit();
    //     }else{
    //         msg = "삭제 실패";
    //         session.rollback();
    //     }
    //     return msg;
    // }
    // // register?
    // public boolean noticeRegister(NoticeVo vo){
    //     boolean b = false;
    //     int cnt = session.insert("notice.post", vo);
    //     if(cnt>0){
    //         b=true;
    //         session.commit();
    //     }else{
    //         b=false;
    //         session.rollback();
    //     }
    //     return b;
    // }

    
}
