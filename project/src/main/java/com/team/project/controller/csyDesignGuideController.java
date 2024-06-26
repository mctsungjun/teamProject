package com.team.project.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class csyDesignGuideController {
    @RequestMapping(path="/design_guide")
    public ModelAndView loadDesignGuide() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("csy_design_guide");
        return mv;
    }
}
