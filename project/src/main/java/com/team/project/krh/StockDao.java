package com.team.project.krh;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class StockDao {
    SqlSession session;
    public StockDao(){
        session=MyFactory.getSession();
    }

    public List<StockVo> search(String findStr){
        List<StockVo> list=null;
        session=MyFactory.getSession();
        list = session.selectList("salestock.searchstock",findStr);
        return list;
    }
}
