package com.team.project.krh;
import java.util.*;
import org.apache.ibatis.session.SqlSession;

import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class StockDao {
    SqlSession session;
    public StockDao(){
        session=new MyFactory().getSession();
    }
    
    public List<StockVo> search(String findStr){
        List<StockVo> list=null;
        session=new MyFactory().getSession();
        list = session.selectList("salestock.stocksearch",findStr);
        session.close();
        return list;
    }
    
    public Map<String,Object> graph(String ProductName, Object PresentStock){
        Map<String, Object> map=new HashMap<>();
        List<String> x= new ArrayList<>();
        List<Integer> y = new ArrayList<>();

        List<StockVo> list=null;
        session=new MyFactory().getSession();
        list = session.selectList("salestock.stockgraph", ProductName);
        for(StockVo v:list){
            x.add(v.getProductName());
            y.add(v.getPresentStock());
        }
        map.put("x",x);
        map.put("y",y);
        
        session.close();
        return map;
    }
}