package com.team.project.krh;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;
import java.util.*;

@Component
public class SalePageDao {
    SqlSession session;
    public SalePageDao(){
        session=new MyFactory().getSession();
    }

    public List<ProductVo> salepagesearch(String findStr){
        List<ProductVo> list =null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepagesearch",findStr);
        session.close();
        return list;
    }

    public List<ProductVo> salepage_cheap(ProductVo vo){
        List<ProductVo> list=null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepage_cheap",vo);
        session.close();
        return list;
    }
}
