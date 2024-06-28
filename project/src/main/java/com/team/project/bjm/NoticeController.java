package com.team.project.bjm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class NoticeController {
    @Autowired
    NoticeDao dao;

    public static String upload="C:\\gitproject\\n" + //
                "otice\\src\\main\\resources\\static\\upload\\";

    @RequestMapping(path="/bjmNoticeList")
    public ModelAndView noticeList(){
        ModelAndView mv = new ModelAndView();
        // Map<String, Object> map = dao.noticeList(page);
        // mv.addObject("map", map);
        mv.setViewName("index"); // 깃에서는 notice/noticeList로 변경필요
        return mv;
    }
    @RequestMapping(path="/notice/bjmRegister")
    public ModelAndView noticeRegister(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("notice/noticeregister");
        return mv;
    }
    /*
    @RequestMapping(path="/notice/bjmRegisterR")
    public String noticeRegisterR(NoticeVo vo){
        String msg = "저장성공";
        msg = dao.registerR(vo);
        return msg;
    }
    */
    
    @RequestMapping(path="/notice/bjmNoticeView")
    public ModelAndView noticeView(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("notice/noticeView");
        return mv;
    }
    @RequestMapping(path="/notice/bjmModify")
    public ModelAndView noticeModify(/*Integer sno */){
        ModelAndView mv = new ModelAndView();
        // Map<String,Object> map = dao.view(sno);
        // mv.addObject("vo",map.get("vo"));
        mv.setViewName("notice/noticeModify");
        return mv;
    }
    /*
    @RequestMapping(path="/notice/bjmModifyR")
    public String modifyR(NoticeVo vo)
    String msg ="";
    msg= dao.modifyR(vo);
    return msg;
    */
}
