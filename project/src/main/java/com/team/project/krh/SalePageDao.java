package com.team.project.krh;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
<<<<<<< HEAD

import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;
=======
import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;
import com.team.project.ojw.ojw_PhotoVo;

>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
import java.util.*;

@Component
public class SalePageDao {
    SqlSession session;
    public SalePageDao(){
        session=new MyFactory().getSession();
    }

<<<<<<< HEAD
    public List<ProductVo> salepagesearch(String findStr){
        List<ProductVo> list =null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepagesearch",findStr);
        session.close();
        return list;
=======
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
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
    }

    public List<ProductVo> salepage_cheap(ProductVo vo){
        List<ProductVo> list=null;
        session=new MyFactory().getSession();
        list=session.selectList("salestock.salepage_cheap",vo);
        session.close();
        return list;
    }
<<<<<<< HEAD
=======

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

    public Map<String, Object> gumae(SaleVo vo){
        Map<String,Object>map=new HashMap<>();
        boolean isSuccess = false;
        String id=vo.getId();
        session = new MyFactory().getSession();
        int cnt = session.insert("salestock.gumae", vo);
        
        if(cnt>0){
            session.commit();
            isSuccess = true;
        }else{
            session.rollback();
        }
        session.close();
        map.put("isSuccess",isSuccess);
        map.put("id",id);
        return map;
    }
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
}
