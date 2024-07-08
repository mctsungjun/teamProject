package com.team.project.msm;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;




@RestController
public class msmQaController {
    
    @Autowired
    msmQaDao dao;

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

    @RequestMapping(path="/qaview")
    public ModelAndView detail(@RequestParam("qusNum") Integer qusNum) {
        ModelAndView mv = new ModelAndView();
        List<msmQaVo> list;
        list = dao.detail(qusNum);

        mv.addObject("list", list);
        mv.setViewName("msmQa/msmQaView");
        
        return mv;
    }
    
    @RequestMapping(path="/answer")
    public ModelAndView answer(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmAnswer");
        return mv;
    }
    

    @RequestMapping(path="/question")
    public ModelAndView question(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("msmQa/msmQuestion");
        return mv;
    }

    
    

    //----------데이터 저장 관련 컨트롤러

    public String saveQuestion(@RequestParam("qusCon") String qusCon,
                               @RequestParam("qusTitle") String qusTitle) {
        msmQaVo vo = new msmQaVo();
        vo.setQusCon(qusCon);
        vo.setQusTitle(qusTitle);
        dao.saveQuestion(vo);
        return "success";
    }
}
