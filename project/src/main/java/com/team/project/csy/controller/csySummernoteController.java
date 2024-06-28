package com.team.project.csy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.csy.CsyBoardDao;
import com.team.project.csy.CsyBoardVo;

@RestController
public class csySummernoteController {
    @Autowired
    CsyBoardDao BoardDao;

    // * 여기까지 잘 옴
    @RequestMapping(path="/summernote/submit")
    public ModelAndView newPostSubmit(CsyBoardVo vo) {
        ModelAndView mv = new ModelAndView();
        /* TODO: 나중에 아이디 받아올 수 있을 때 수정 */
        vo.setId("sampleID");
        String status = BoardDao.post(vo) ? "Post Complete" : "Something Went Wrong!";
        System.out.println("summernotController: " + status);
        // * 글 작성 페이지가 아니라, 해당 글 페이지로 들어가야할 듯..
        mv.setViewName("csy_board/csy_list");
        return mv;
    }

    @RequestMapping(path="/summernote/modify")
    public ModelAndView modifyPostSubmit(CsyBoardVo vo) {
        ModelAndView mv = new ModelAndView();
        System.out.println(vo);
        /* TODO: 나중에 아이디 받아올 수 있을 때 수정 */
        vo.setId("sampleID");
        String status = BoardDao.modify(vo) ? "Post Complete" : "Something Went Wrong!";
        System.out.println("summernotController: " + status);
        // * 글 작성 페이지가 아니라, 해당 글 페이지로 들어가야할 듯..
        mv.setViewName("csy_board/csy_list");
        return mv;
    }
    
}