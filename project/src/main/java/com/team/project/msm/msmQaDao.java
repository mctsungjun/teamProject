package com.team.project.msm;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;

@Service
@Component
public class msmQaDao {
      
    SqlSession session;

    //기본적인 session 콜
    public msmQaDao(){
        session = new MyFactory().getSession();
    }
    
    //컨트롤러에서 검색을 쓰기위한 list와 search
    public List<msmQaVo> list(){
        List<msmQaVo> list = session.selectList("msmQa.qalist");
        return list; 
    }

    public List<msmQaVo> search(String findStr) {
       List<msmQaVo> list = session.selectList("msmQa.search", findStr);
       return list;
    }   

    //질문 및 답변을 자세하게 볼때
    public msmQaVo qaview(Integer qusNum){
        session = new MyFactory().getSession();
        msmQaVo vo = session.selectOne("msmQa.qaView", qusNum);
        return vo;
    }
    
 

    //질문 내용을 저장할때
    @Transactional
    public String qusWrite(msmQaVo vo){
        String msg="";
        session = new MyFactory().getSession();

        int cnt = session.insert("msmQa.saveQuestion", vo);
        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="저장중 오류발생";
        }
        return msg;
    }


    //답변 내용을 저장할때
    @Transactional
    public String ansWrite(msmQaVo vo){
        String msg="";
        session = new MyFactory().getSession();

        int cnt = session.update("msmQa.saveAnswer", vo);
        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="저장중 오류발생";
        }
        session.close();
        return msg;
    }
}
