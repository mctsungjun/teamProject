package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;

@Service
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

    
    public ProductVo product_view(String productCode){
        session = new MyFactory().getSession();
        ProductVo vo = session.selectOne("project.product_view",productCode);
        List<ojw_PhotoVo> photos = session.selectList("project.photos",productCode);
        vo.setPhotos(photos);
        session.close();
        return vo;
    }
    
    @Transactional
    public String product_register(ProductVo vo){
        String msg="";
        session = new MyFactory().getSession();

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
