package com.team.project.krh;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;
import com.team.project.ojw.ojw_PhotoVo;

import java.util.*;

@Component
public class SalePageDao {
    SqlSession session;
    public SalePageDao(){
        session=new MyFactory().getSession();
    }

    public Map<String,Object> salepagesearch(Page page){
        Map<String, Object> map = new HashMap<>();
        List<ProductVo> list=null;
        session = new MyFactory().getSession();
        int totSize = session.selectOne("salestock.totSize", page.getFindStr());
        page.setTotSize(totSize);
        page.compute();
        System.out.println(page);
        list = session.selectList("salestock.salepagesearch", page);
        map.put("page", page);
        map.put("list", list);
        session.close();
        return map;
    }

    public List<ProductVo> salepage_cheap(ProductVo vo){
        List<ProductVo> list=null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepage_cheap",vo);
        session.close();
        return list;
    }

    public List<ProductVo> salepage_expensive(ProductVo vo){
        List<ProductVo> list = null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepage_expensive", vo);
        session.close();
        return list;
    }

    public List<ProductVo> salepage_new(ProductVo vo){
        List<ProductVo> list=null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepage_new",vo);
        session.close();
        return list;
    }

    public ProductVo salepage_view(String productCode){
        session=new MyFactory().getSession();
        ProductVo vo=session.selectOne("salestock.salepage_view",productCode);
        List<ojw_PhotoVo>photos = session.selectList("salestock.salepage_photos", productCode);
        vo.setPhotos(photos);
        session.close();
        return vo;
    }
}
