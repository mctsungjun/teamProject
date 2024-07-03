package com.team.project.krh;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class SaleDao {
    SqlSession session;
    public SaleDao(){
        session= new MyFactory().getSession();
    }

    public List <SaleVo> search(String findStr){
        List<SaleVo> list=null;
        session=new MyFactory().getSession();
        list = session.selectList("salestock.search",findStr);
        return list;
    }

    public SaleVo sale_view(Integer sno){
        session=new MyFactory().getSession();
        SaleVo vo=session.selectOne("salestock.view",sno);
        return vo;
    }

    public SaleVo select(Integer sno){
        System.out.println("sno:"+sno);
        SaleVo vo=null;
        session=new MyFactory().getSession();
        vo = session.selectOne("salestock.select",sno);
        return vo;
    }

    public boolean sale_view_modify(SaleVo vo){
        boolean isDaoSuccess=false;
        session=new MyFactory().getSession();
        int cnt=session.update("salestock.update", vo);
        if(cnt>0){
            isDaoSuccess=true;
            session.commit();
        }else{
            session.rollback();
        }
        return isDaoSuccess;
    }
}
