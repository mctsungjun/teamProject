package com.team.project.msm;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import ch.qos.logback.core.model.Model;


@RestController
public class msmQaController {
    
    @Autowired
    msmQaDao dao;

    @RequestMapping(path="/qa")
    public ModelAndView qa(String findStr) {
        ModelAndView mv = new ModelAndView();
        List<msmQaVo> list = dao.list(findStr);
        mv.addObject("list", list);
        mv.setViewName("msmQa/msmQa");
        return mv;
    }

    @RequestMapping(path="/question")
    public ModelAndView question(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmQuestion");
        return mv;
    }

    /*@RequestMapping(path="/qaview")
    public String getDetail(Model model, int qusNum) {
        ModelAndView mv = new ModelAndView();
        Map<String, Object> map = dao.detail(qusNum);
        mv.addObject("detail", map);
        mv.setViewName("msmQa/msmQaView");
        return map;
    }*/
    
    @RequestMapping(path="/answer")
    public ModelAndView answer(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmAnswer");
        return mv;
    }

    
    
}
