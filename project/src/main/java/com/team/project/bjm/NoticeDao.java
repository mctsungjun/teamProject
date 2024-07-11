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

    // search,list dao
    public List<NoticeVo> noticeList(NoticePage page,NoticeVo vo){
        session = new MyFactory().getSession();
        // Controller에서 List로 반환해서 Map이 필요할까?
        System.out.println("Dao : "+page.getNowPage());
        System.out.println("DaoF :"+page.getFindStr());
        List<NoticeVo> list =null;
        int totSize = session.selectOne("notice.totSize",page.getFindStr());
        page.setTotSize(totSize); // 페이징
        page.compute(); // NoticePage의 compute()메서드로 페이지처리
        
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
    public void noticeHit(Integer sno){
        session = new MyFactory().getSession();
        // String msg = "";
        session.update("notice.postHit",sno);
        System.out.println("Dao Sno : "+ sno);
        session.commit();
        session.close();
        // int cnt = session.update("notice.postHit",sno);
        // if(cnt > 0){
        //     session.commit();
        // }else{
        //     session.close();
        // }
        // return msg;
    }
    public String noticeRegisterR(NoticeVo vo, List<NoticeAtt> attFiles) {
        session = new MyFactory().getSession();
        String msg = "";
        // System.out.println("Dao"+vo);
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
    // public Map<String, Object> noticeModify(Integer sno){
    //     session = new MyFactory().getSession();
    //     Map<String,Object> map = new HashMap<>();
    //     int cnt = session.update("notice.modify",sno);
    //     if(cnt>0){
    //         session.commit();
    //     }else{
    //         session.rollback();
    //     }
    //     session.close();
    //     return map;
    // }
    public String noticeModifyR(NoticeVo vo, List<NoticeAtt> attFiles) {
        session = new MyFactory().getSession();
        String msg = "";
        // System.out.println("Dao"+vo);
        // System.out.println("Dao"+vo.getAttFiles());
        int cnt = session.update("notice.modify", vo);
        Map<String, Object> map = new HashMap<>();
        map.put("pSno", vo.getSno());

        if (cnt > 0) { //  && cntAtt == attFiles.size()) {
            session.commit();
        } else {
            session.rollback();
            msg = "ERROR";
        }
    
        session.close();
        return msg;
    }
}
