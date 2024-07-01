package com.team.project.ojw;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ProductController {
    @Autowired
    ProductDao ProductDao;

    @RequestMapping(path="/product")
    public ModelAndView product(String findStr){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list = ProductDao.product(findStr);
        mv.addObject("product", list);
        mv.setViewName("ojw/product");
        return mv;
    }
}
