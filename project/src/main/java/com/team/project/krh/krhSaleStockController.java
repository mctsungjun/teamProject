package com.team.project.krh;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class krhSaleStockController {
    @Autowired
    SaleDao saleDao;
    StockDao stockDao;
    public static String upload="C:\\finalproject\\src\\main\\resources\\static\\upload\\";
    
    @RequestMapping(path="/")
    public ModelAndView index(){
        ModelAndView mv=new ModelAndView();
        mv.setViewName("krh/index");
        return mv;
    }

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
    
    @RequestMapping(path="/sale_update_form")
    public ModelAndView UpdateForm(Integer sno){
        ModelAndView mv= new ModelAndView();
        SaleVo vo=saleDao.select(sno);
        mv.addObject("vo",vo);
        mv.setViewName("krh/sale_view_modify");
        return mv;
    }

    @RequestMapping(path="/sale_view_modify")
    public boolean sale_view_modify(SaleVo vo){
        System.out.println(vo);
        boolean isSuccess=false;
        isSuccess=saleDao.sale_view_modify(vo);
        return isSuccess;
    }
}

