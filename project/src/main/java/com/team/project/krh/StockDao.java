package com.team.project.krh;
import java.io.Reader;
import java.util.*;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Component
public class StockDao {
    
    public SqlSession getSession(){
        SqlSession session=null;

        try{Reader reader = Resources.getResourceAsReader("com/team/project/mybatis/config.xml");
        SqlSessionFactory factory = 
            new SqlSessionFactoryBuilder().build(reader);
            session = factory.openSession();
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return session;
    }

    SqlSession session = getSession();
    
    @Transactional
    public Map<String,Object> stocksearch(StockPage stockpage){
        Map<String,Object> map = new HashMap<>();
        List<StockVo> list=null;
        //session=new MyFactory().getSession();
        // if (stockpage.getFindStr() == null) {
        //   stockpage.setFindStr("망고");
        // }
        // System.out.println("FindStr");
        // System.out.println(stockpage.getFindStr());
        int totSize=session.selectOne("salestock.StocktotSize",stockpage.getFindStr());
        stockpage.setTotSize(totSize);
        stockpage.compute();
        list = session.selectList("salestock.stocksearch", stockpage);
        map.put("stockpage",stockpage);
        map.put("list",list);
        //session.close();
        return map;
    }
    
    @Transactional
    public Map<String,Object> graph(String ProductName, Object ea){
        Map<String, Object> map=new HashMap<>();
        List<String> x= new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        List<StockVo> list=null;
        //session=new MyFactory().getSession();
        list = session.selectList("salestock.stockgraph", ProductName);
        for(StockVo v:list){
            x.add(v.getProductName());
            y.add(v.getEa());
        }
        map.put("x",x);
        map.put("y",y);
        //session.close();
        return map;
    }


    //재고 마이너스


}