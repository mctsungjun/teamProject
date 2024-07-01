package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class ProductDao {
    SqlSession session;
    public ProductDao(){
        session = MyFactory.getSession();
    }
    
    public List<ProductVo> product(String findStr){
        List<ProductVo> list = null;
        session = MyFactory.getSession();
        list = session.selectList("project.product_search",findStr);

        return list;
    }
}
