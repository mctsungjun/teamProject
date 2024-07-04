package com.team.project.krh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.util.*;
import com.team.project.ojw.ProductVo;


@RestController
public class krhSalePageController {
    @Autowired
    SalePageDao salepageDao;
    //페이징 처리...^^
    @RequestMapping(path="/salepage")
    public ModelAndView salepage(Page page){
        ModelAndView mv = new ModelAndView();
        Map<String, Object>map = salepageDao.salepagesearch(page);
        mv.addObject("map",map);
        mv.setViewName("krh/salepage");
        return mv;
    }

    @RequestMapping(path="/salepage_cheap")
    public ModelAndView salepage_cheap(ProductVo vo){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list=salepageDao.salepage_cheap(vo);
        mv.addObject("salepage_cheap",list);
        mv.setViewName("krh/salepagecheap");
        return mv;
    }

    @RequestMapping(path="/salepage_expensive")
    public ModelAndView salepage_expensive(ProductVo vo){
        ModelAndView mv= new ModelAndView();
        List<ProductVo> list=salepageDao.salepage_expensive(vo);
        mv.addObject("salepage_expesive", list);
        mv.setViewName("krh/salepageexpensive");
        return mv;
    }

    @RequestMapping(path="/salepage_new")
    public ModelAndView salepage_new(ProductVo vo){
        ModelAndView mv=new ModelAndView();
        List<ProductVo> list=salepageDao.salepage_new(vo);
        mv.addObject("salepage_new", list);
        mv.setViewName("krh/salepagenew");
        return mv;
    }

    @RequestMapping(path="salepage_view")
    public ModelAndView salepage_view(String productCode){
        ModelAndView mv = new ModelAndView();
        ProductVo vo=salepageDao.salepage_view(productCode);
        mv.addObject("vo",vo);
        mv.setViewName("krh/salepage_view");
        return mv;
    }
}