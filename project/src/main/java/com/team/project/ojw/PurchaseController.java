package com.team.project.ojw;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
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
        List<PurchaseVo> list = PurchaseDao.purchase_search(findStr);
        mv.addObject("purchase",list);
        mv.setViewName("ojw/purchase");
        return mv;
    }

    @RequestMapping(path="/purchase_view")
    public ModelAndView purchase_view(Integer no){
        ModelAndView mv = new ModelAndView();
        PurchaseVo vo = PurchaseDao.purchase_view(no);
        mv.addObject("vo", vo);
        mv.setViewName("ojw/purchase_view");
        return mv;
    }

    @RequestMapping(path="/purchase_list")
    public ModelAndView purchase_list(Integer no){
        ModelAndView mv = new ModelAndView();
        PurchaseCustomerVo vo = PurchaseDao.purchase_list(no);
        mv.addObject("vo", vo);
        mv.setViewName("ojw/purchase_list");
        return mv;
    }

    @RequestMapping(path="/purchase_register")
    public ModelAndView purchase_register(){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list = PurchaseDao.purchase_register_list();
        mv.addObject("list", list);
        mv.setViewName("ojw/purchase_register");
        return mv;
    }

    @RequestMapping(path="/purchase_registerR")
    public String purchase_registerR(PurchaseVo vo){
        String msg = PurchaseDao.purchase_register(vo);
        return msg;
    }

    @RequestMapping(path="/purchase_deleteR")
    public String purchase_delete(Integer no){
        String msg = PurchaseDao.purchase_delete(no);
        return msg;
    }

    @RequestMapping(path="/purchase_modify")
    public ModelAndView purchase_update(Integer no){
        ModelAndView mv = new ModelAndView();
        PurchaseVo vo = PurchaseDao.purchase_view(no);
        mv.addObject("vo", vo);
        mv.addObject("list", PurchaseDao.purchase_register_list());
        mv.setViewName("ojw/purchase_modify");
        return mv;
    }
    @RequestMapping(path="/purchase_modifyR")
    public ModelAndView purchase_modifyR(@ModelAttribute PurchaseVo vo){
        ModelAndView mv = new ModelAndView();
        String msg=PurchaseDao.purchase_modify(vo);
        mv = purchase("");
        mv.addObject("msg", msg);
        return mv;
    }
}
