package com.team.project.ojw;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class PurchaseController {
    @Autowired
    PurchaseDao PurchaseDao;

    @RequestMapping(path="/purchase")
    public ModelAndView purchase(String findStr){
        ModelAndView mv = new ModelAndView();
        List<PurchaseVo> list = PurchaseDao.search(findStr);
        mv.addObject("purchase",list);
        mv.setViewName("purchase");
        return mv;
    }

    @RequestMapping(path="/purchase_view")
    public ModelAndView purchase_view(Integer no){
        ModelAndView mv = new ModelAndView();
        PurchaseVo vo = PurchaseDao.purchase_view(no);
        mv.addObject("vo", vo);
        mv.setViewName("purchase_view");
        return mv;
    }

    @RequestMapping(path="/purchase_list")
    public ModelAndView purchase_list(Integer no){
        ModelAndView mv = new ModelAndView();
        PurchaseVo vo = PurchaseDao.purchase_list(no);
        mv.addObject("vo", vo);
        mv.setViewName("purchase_list");
        return mv;
    }
}
