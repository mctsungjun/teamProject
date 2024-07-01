package com.team.project.sungController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MemberController2 {
    
     // 로그인후 index페이지로
    @RequestMapping(path="/indexx")
    public String index(){
        // ModelAndView mv = new ModelAndView();
        return "index.html";
    }
}
