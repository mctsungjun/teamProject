package com.team.project.bjm;

import java.util.List;

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
    // 삭제 dao
    public String delete(Integer sno){
        int cnt = session.delete("notice.delete", sno);
        String msg = "";
        if(cnt>0){
            msg = "삭제 성공";
            session.commit();
        }else{
            msg = "삭제 실패";
            session.rollback();
        }
        return msg;
    }
    // register?
    public boolean noticeRegister(NoticeVo vo){
        boolean b = false;
        
        return b;
    }

    public String registerR(NoticeVo vo){
        session = new MyFactory().getSession();
        String msg ="";
        
        session.close();
        return msg;
    }
}
