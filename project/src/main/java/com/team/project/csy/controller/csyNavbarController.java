package com.team.project.csy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.csy.CsyBoardDao;

import jakarta.servlet.http.HttpSession;


@RestController
public class csyNavbarController {
    @Autowired
    CsyBoardDao BoardDao;

    @RequestMapping(path="/nav")
    public ModelAndView loadNav(HttpSession session) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("csy_navbar/csy_nav");
        String id = (String) session.getAttribute("id");
        String userProfilePic = BoardDao.userProfilePic(id);
        mv.addObject("profilePic", userProfilePic);
        return mv;
    }
}