package com.team.project.msm;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpSession;

@RestController
public class msmQaController {
    
    @Autowired
    msmQaDao dao;

    //qa 페이지
    @RequestMapping(path="/qa")
    public ModelAndView qa(String findStr) {
        ModelAndView mv = new ModelAndView();
        List<msmQaVo> list;

        //검색 기능
        if (findStr != null && !findStr.isEmpty()) {
            list = dao.search(findStr);
        } else {
            list = dao.list();
        }

        mv.addObject("list", list);
        mv.setViewName("msmQa/msmQa");

        return mv;
    }

    //qa 페이지에서 특정 부분을 클릭하면 자세한 데이터를 표기
    @RequestMapping(path="/qaview")
    public ModelAndView qaview(Integer qusNum) {
        ModelAndView mv = new ModelAndView();
        msmQaVo vo = dao.qaview(qusNum);
        mv.addObject("q", vo);
        mv.setViewName("msmQa/msmQaView");
        return mv;

    }
    
    @RequestMapping(path="/answer")
    public ModelAndView answer(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmAnswer");
        return mv;
    }
    
    @RequestMapping(path="/answerR")
    public String answerR(msmQaVo qusNum){
        String msg = dao.ansWrite(qusNum);
        return msg;
    }
    

    @RequestMapping(path="/question")
    public ModelAndView question(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmQuestion");
        return mv;
    }
    
    @RequestMapping(path="/questionR")
    public String questionR(String qusNum, HttpSession session){
        String id = (String) session.getAttribute("id");
        String msg = dao.qusWrite(qusNum);
        return msg;
    }

    @RequestMapping(path="/qaDeleteR")
    public String delete(String qusNum){
        String msg = dao.delete(qusNum);
        return msg;
    }
}
