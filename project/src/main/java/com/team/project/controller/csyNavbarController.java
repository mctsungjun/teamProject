package com.team.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class csyNavbarController {
    @RequestMapping(path="/nav")
    public ModelAndView loadNav() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("csy_navbar/csy_nav");
        return mv;
    }
}
