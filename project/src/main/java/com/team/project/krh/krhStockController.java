package com.team.project.krh;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class krhStockController {

=======
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class krhStockController {
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
    @Autowired
    StockDao stockDao;
    StockVo stockVo;

    @RequestMapping(path="/stock")
<<<<<<< HEAD
    public ModelAndView search(String findStr){
        ModelAndView mv= new ModelAndView();
        List<StockVo>list=stockDao.search(findStr);
        mv.addObject("stock",list);
=======
    public ModelAndView stocksearch(StockPage stockpage){
        ModelAndView mv= new ModelAndView();
        Map<String,Object> map=stockDao.stocksearch(stockpage);
        mv.addObject("map",map);
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
        mv.setViewName("krh/stock");
        return mv;
    }
    
    @RequestMapping(path="/stockgraph")
<<<<<<< HEAD
    public Map<String,Object> graph(String ProductName, Object PresentStock){
        Map<String, Object> map = new HashMap<>();
        map=stockDao.graph(ProductName, PresentStock);
=======
    public Map<String,Object> graph(String ProductName, Object ea){
        Map<String, Object> map = new HashMap<>();
        map=stockDao.graph(ProductName, ea);
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
        return map;
    }
}
