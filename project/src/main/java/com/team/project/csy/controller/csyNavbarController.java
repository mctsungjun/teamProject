package com.team.project.csy.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpSession;


@RestController
public class csyNavbarController {
    @RequestMapping(path="/nav")
    public ModelAndView loadNav() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("csy_navbar/csy_nav");
        return mv;
    }
}