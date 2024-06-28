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
        session= MyFactory.getSession();
    }

    public List<PurchaseVo> search(String findStr){
        List<PurchaseVo> list = null;
        session = MyFactory.getSession();
        list = session.selectList("project.purchase_main",findStr);

        return list;
    }

    public PurchaseVo purchase_view(Integer no){
        session = MyFactory.getSession();
        PurchaseVo vo = session.selectOne("project.purchase_view",no);

        return vo;
    }

    public PurchaseVo purchase_list(Integer no){
        session = MyFactory.getSession();
        PurchaseVo vo = session.selectOne("project.purchase_list",no);

        return vo;
    }

    @Transactional
    public String purchase_modify(PurchaseVo vo){
        session = MyFactory.getSession();
        int cnt = session.update("project.purchase_modify",vo);
        String msg="";
        
        if(cnt>0){
            msg="수정 완료";
            session.commit();
        }else{
            msg="수정 실패";
            session.rollback();
        }

        return msg;
    }


}
