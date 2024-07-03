package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class ProductDao {
    SqlSession session;
    public ProductDao(){
        session = new MyFactory().getSession();
    }
    
    public List<ProductVo> product(String findStr){
        List<ProductVo> list = null;
        session = new MyFactory().getSession();
        list = session.selectList("project.product_search",findStr);
        session.close();
        return list;
    }

    public ProductVo product_view(Integer no){
        ProductVo vo = null;
        session = new MyFactory().getSession();
        vo = session.selectOne("project.product_view",no);
        List<ojw_PhotoVo> photos = session.selectList("project.photos",no);
        vo.setPhotos(photos);
        session.close();
        return vo;
    }
    
    public String product_register(ProductVo vo){
        session = new MyFactory().getSession();
        String msg="";
        int cnt = session.insert("project.product_register", vo);
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
