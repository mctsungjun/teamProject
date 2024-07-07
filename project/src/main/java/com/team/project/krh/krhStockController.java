package com.team.project.krh;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class krhStockController {

    @Autowired
    StockDao stockDao;
    StockVo stockVo;

    @RequestMapping(path="/stock")
    public ModelAndView stocksearch(StockPage stockpage){
        ModelAndView mv= new ModelAndView();
        Map<String,Object> map=stockDao.stocksearch(stockpage);
        mv.addObject("map",map);
        mv.setViewName("krh/stock");
        return mv;
    }
    
    @RequestMapping(path="/stockgraph")
    public Map<String,Object> graph(String ProductName, Object PresentStock){
        Map<String, Object> map = new HashMap<>();
        map=stockDao.graph(ProductName, PresentStock);
        return map;
    }
}
