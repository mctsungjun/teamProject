package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;

@Service
@Component
public class PurchaseDao {
    SqlSession session;
    public PurchaseDao(){
        session= new MyFactory().getSession();
    }

    public List<PurchaseVo> search(String findStr){
        List<PurchaseVo> list = null;
        session = new MyFactory().getSession();
        list = session.selectList("project.purchase_search",findStr);
        session.close();
        return list;
    }

    public PurchaseVo purchase_view(Integer no){
        session = new MyFactory().getSession();
        PurchaseVo vo = session.selectOne("project.purchase_view",no);
        session.close();
        return vo;
    }

    public PurchaseVo purchase_list(Integer no){
        session = new MyFactory().getSession();
        PurchaseVo vo = session.selectOne("project.purchase_list",no);
        session.close();
        return vo;
    }

    @Transactional
    public String purchase_modify(PurchaseVo vo){
        session = new MyFactory().getSession();
        int cnt = session.update("project.purchase_modify",vo);
        String msg="";
        
        if(cnt>0){
            msg="수정 완료";
            session.commit();
        }else{
            msg="수정 실패";
            session.rollback();
        }
        session.close();
        return msg;
    }


}
