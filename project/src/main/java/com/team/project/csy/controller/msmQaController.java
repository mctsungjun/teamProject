package com.team.project.csy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class msmQaController {
    
    @Autowired
    msmQaDao dao;

    
    @RequestMapping(path="/qa")
    public ModelAndView qa() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmQa");
        return mv;
    }

    @RequestMapping(path="/question")
    public ModelAndView question(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmQuestion");
        return mv;
    }

    @RequestMapping(path="/answer")
    public ModelAndView answer(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmAnswer");
        return mv;
    }
}
