package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class PurchaseDao {
    SqlSession session;
    public PurchaseDao(){
        session=new MyFactory().getSession();
    }

    public List<PurchaseVo> search(String findStr){
        List<PurchaseVo> list = null;
        SqlSession session = new MyFactory().getSession();
        list = session.selectList("project.purchase_main",findStr);
        session.close();
        return list;
    }

    public PurchaseVo purchase_view(Integer no){
        SqlSession session = new MyFactory().getSession();
        PurchaseVo vo = session.selectOne("project.purchase_view",no);
        session.close();
        return vo;
    }

    public PurchaseVo purchase_list(Integer no){
        SqlSession session = new MyFactory().getSession();
        PurchaseVo vo = session.selectOne("project.purchase_list",no);
        session.close();
        return vo;
    }
}
