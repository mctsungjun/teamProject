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

    @RequestMapping(path="/salepage")
    public ModelAndView salepagesearch(String findStr){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list = salepageDao.salepagesearch(findStr);
        mv.addObject("salepage",list);
        mv.setViewName("krh/salepage");
        return mv;
    }

    @RequestMapping(path="/salepage_cheap")
    public ModelAndView salepage_cheap(ProductVo vo){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list=salepageDao.salepage_cheap(vo);
        mv.addObject("salepage_cheap",list);
        mv.setViewName("krh/salepage");
        return mv;
    }
}
