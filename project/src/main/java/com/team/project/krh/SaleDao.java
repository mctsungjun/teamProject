package com.team.project.krh;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.*;

import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;

import org.springframework.transaction.annotation.Transactional;
@Service
@Component
public class SaleDao {
    SqlSession session;
    public SaleDao(){
        session=new MyFactory().getSession();
    }

    public List <SaleVo> search(String findStr){
        List<SaleVo> list=null;
        session=new MyFactory().getSession();
        list = session.selectList("salestock.search",findStr);
        session.close();
        return list;
    }

    public SaleVo sale_view(Integer sno){
        session=new MyFactory().getSession();
        SaleVo vo=session.selectOne("salestock.list",sno);
        session.close();
        return vo;
    }

    public SaleVo select(Integer sno){
        System.out.println("sno:"+sno);
        SaleVo vo=null;
        session=new MyFactory().getSession();
        vo = session.selectOne("salestock.select",sno);
        session.close();
        return vo;
    }


    public SaleVo sale_list(Integer sno){
        session=new MyFactory().getSession();
        SaleVo vo=session.selectOne("salestock.list",sno);
        session.close();
        return vo;
    }
    
    @Transactional
    public String sale_view_modify(SaleVo vo){
        session= new MyFactory().getSession();

        int cnt=session.update("salestock.update", vo);
        String msg="";
        if(cnt>0){
            msg="정상적으로 수정되었습니다.";
            session.commit();
        }else{
            msg="수정에 실패하였습니다.";
            session.rollback();
        }
        session.close();
        return msg;
    }

    public List<ProductVo> salepagesearch(String findStr2){
        List<ProductVo> list2 =null;
        session=new MyFactory().getSession();
        list2=session.selectList("salestock.salepagesearch",findStr2);
        session.close();
        return list2;
    }
}
