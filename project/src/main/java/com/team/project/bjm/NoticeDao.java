package com.team.project.bjm;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class NoticeDao {
    SqlSession session;

    
    public List<NoticeVo> noticeList(NoticePage page,NoticeVo vo){
        session = new MyFactory().getSession();
        
        List<NoticeVo> list =null;
        int totSize = session.selectOne("notice.totSize",page.getFindStr());
        page.setTotSize(totSize);
        page.compute();
        
        list = session.selectList("notice.search",page);
        
        session.close();
        return list;
    }
    public Map<String, Object> noticeView(Integer sno){
        session = new MyFactory().getSession();
        Map<String, Object> map = new HashMap<>();
        NoticeVo vo = session.selectOne("notice.view", sno);
        
        List<NoticeAtt> attFiles = session.selectList("notice.attFiles",sno);
        map.put("vo", vo);
        map.put("attFiles",attFiles);
        session.close();
        return map;
    }
    public String noticeRegisterR(NoticeVo vo, List<NoticeAtt> attFiles) {
        session = new MyFactory().getSession();
        String msg = "";
        int cnt = session.insert("notice.post", vo);
        int cntAtt = 0;
    
    
        if (vo.getAttFiles() != null && vo.getAttFiles().size() > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("pSno", vo.getSno());
            map.put("attFiles", attFiles);
            cntAtt = session.insert("notice.postAtt", map);
        }

        if (cnt > 0) {
            session.commit();
        } else {
            session.rollback();
            msg = "ERROR";
        }
    
        session.close();
        return msg;
    }
    
    public String noticeDelete(Integer sno){
        session = new MyFactory().getSession();
        String msg = "";
        try{
            int cnt = session.delete("notice.delete", sno);
            if(cnt<=0) throw new Exception();
            List<String> delFiles = session.selectList("notice.deleteFiles",sno);
            if(delFiles.size()>0){
                cnt = session.delete("notice.delete_noticeAtt",sno);
                if(cnt<=0) throw new Exception();
                for(String f: delFiles){
                    File file = new File(NoticeController.upload+f);
                    if(file.exists()) file.delete();
                }
            }
            msg = "삭제 성공";
            session.commit();
        }catch(Exception e){
            msg = "삭제 실패";
            session.rollback();
        }
        session.close();
        return msg;
    }
    public String noticeModifyR(NoticeVo vo, List<NoticeAtt> attFiles) {
        session = new MyFactory().getSession();
        String msg = "";
        int cnt = session.update("notice.modify", vo);
        Map<String, Object> map = new HashMap<>();
        map.put("pSno", vo.getSno());

        if (cnt > 0) {
            session.commit();
        } else {
            session.rollback();
            msg = "ERROR";
        }
    
        session.close();
        return msg;
    }
}
