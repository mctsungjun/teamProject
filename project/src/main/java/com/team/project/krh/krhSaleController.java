package com.team.project.krh;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.ojw.ProductVo;


@RestController
public class krhSaleController {
    @Autowired
    SaleDao saleDao;
    StockDao stockDao;
    int sno=0;

    //sale.html
    @RequestMapping(path="/sale")
    public ModelAndView search(String findStr){
        ModelAndView mv=new ModelAndView();
        List<SaleVo>list = saleDao.search(findStr);
        mv.addObject("sale", list);
        mv.setViewName("krh/sale");
        return mv;
    }

    @RequestMapping(path="/sale_view")
    public ModelAndView sale_view(Integer sno){
        ModelAndView mv=new ModelAndView();
        SaleVo vo=saleDao.sale_view(sno);
        mv.addObject("vo",vo);
        mv.setViewName("krh/sale_view");
        return mv;
    }
    
    @RequestMapping(path="/saleUpdateForm")
    public ModelAndView UpdateForm(Integer sno){
        ModelAndView mv= new ModelAndView();
        SaleVo vo=saleDao.select(sno);
        mv.addObject("vo",vo);
        mv.setViewName("krh/sale_view_modify");
        return mv;
    }

    @RequestMapping(path="/sale_view_modify")
    public ModelAndView sale_view_modify(Integer sno){
        ModelAndView mv= new ModelAndView();
        SaleVo vo=saleDao.sale_view(sno);
        List<ProductVo> list = saleDao.product_list();
        mv.addObject("vo", vo);
        mv.addObject("list", list);
        mv.setViewName("krh/sale_view_modify");
        return mv;
    }

    @RequestMapping(path="/sale_view_modifyR")
    public ModelAndView modifyR(@ModelAttribute SaleVo vo){
        System.out.println(vo);
        ModelAndView mv=new ModelAndView();
        String msg=saleDao.sale_view_modify(vo);
        mv=search("");
        mv.addObject("msg",msg);
        return mv;
}

    @RequestMapping(path="/sale_list")
    public ModelAndView sale_list(Integer sno){
        ModelAndView mv=new ModelAndView();
        SaleWithUsersVo vo=saleDao.sale_list(sno);
        mv.addObject("vo",vo);
        mv.setViewName("krh/sale_list");
        return mv;
    }

    @RequestMapping(path="deleteR")
    public String delete(Integer sno){
        String msg=saleDao.delete(sno);
        return msg;
    }
}