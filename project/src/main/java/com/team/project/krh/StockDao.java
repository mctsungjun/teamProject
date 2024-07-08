package com.team.project.krh;
import java.io.Reader;
import java.util.*;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Component;
import com.team.project.mybatis.MyFactory;

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
    
    public Map<String,Object> stocksearch(StockPage stockpage){
        System.out.println("몇 번 오나요?");
        System.out.println("몇 번 오나요?");
        System.out.println("몇 번 오나요?");
        System.out.println("몇 번 오나요?");
        Map<String,Object> map = new HashMap<>();
        List<StockVo> list=null;
        //session=new MyFactory().getSession();
        // if (stockpage.getFindStr() == null) {
        //   stockpage.setFindStr("망고");
        // }
        // System.out.println("FindStr");
        // System.out.println(stockpage.getFindStr());
        int totSize=session.selectOne("salestock.StocktotSize",stockpage.getFindStr());
        System.out.println(totSize);
        stockpage.setTotSize(totSize);
        stockpage.compute();
        System.out.println(stockpage);
        list = session.selectList("salestock.stocksearch", stockpage);
        System.out.println(stockpage);
        map.put("stockpage",stockpage);
        map.put("list",list);
        //session.close();
        System.out.println(map);
        return map;
    }
    
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

}