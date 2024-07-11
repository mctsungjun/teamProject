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
       findStr = "%" + findStr + "%";
       List<msmQaVo> list = session.selectList("msmQa.search", findStr);
       return list;
    }   

    // public List<msmQaVo> searchList(String findStr){
    //     findStr = "%" + findStr + "%";
    //     List<msmQaVo> list = session.selectList("msmQa.qalist",findStr);
    //     return list;
    // }
    
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
            msg="4저장중 오류발생";
        }
        return msg;
    }


    //답변 내용을 저장할때
    @Transactional
    public String ansWrite(msmQaVo vo){
        String msg="";
        session = new MyFactory().getSession();
        int cnt = session.update("msmQa.updateAnswer", vo);
        System.out.println(vo);

        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="1저장중 오류발생";
        }
        return msg;
    }

    public String qaDelete(String qusNum){
        session = new MyFactory().getSession();
        String msg = "";
        int cnt = session.delete("msmQa.delete", qusNum);      
        if(cnt>0){
            msg="삭제됨";
            session.commit();
        }else{
            session.rollback();
            msg = "삭제중 오류발생";
        }
        return msg;
    }    
    @Transactional
    public String qusModify(msmQaVo vo){
        String msg="";
        session = new MyFactory().getSession();
        int cnt = session.update("msmQa.qusModify", vo);
        System.out.println(vo);

        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="11저장중 오류발생";
        }
        return msg;
    }

    public msmQaVo qusModifyEnter(String qusNum) {
        int num = Integer.parseInt(qusNum);
        msmQaVo vo = session.selectOne("qusModifyPresentData", num);
        System.out.println(vo);
        return vo;
    }


    @Transactional
    public String ansModify(msmQaVo vo){
        System.out.println(vo);
        String msg="";
        session = new MyFactory().getSession();
        int cnt = session.update("msmQa.ansModify", vo);
        System.out.println(vo);

        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="6저장중 오류발생";
        }
        return msg;
    }
}

