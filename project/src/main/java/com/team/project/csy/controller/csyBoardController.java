package com.team.project.csy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.csy.CsyBoardCommentVo;
import com.team.project.csy.CsyBoardDao;
import com.team.project.csy.CsyBoardLikesVo;
import com.team.project.csy.CsyBoardListPageVo;
import com.team.project.csy.CsyBoardVo;


@RestController
public class csyBoardController {
    @Autowired
    CsyBoardDao BoardDao;
    
    @RequestMapping(path="/board")
    public ModelAndView search(CsyBoardListPageVo pageVo){
        ModelAndView mv = new ModelAndView();

        if (pageVo.getFindStr() == null) { pageVo.setFindStr("");}

        Map<String, Object> map = BoardDao.search(pageVo);
        List<CsyBoardVo> postList = (List<CsyBoardVo>) map.get("postList");
        
        pageVo = (CsyBoardListPageVo) map.get("pageVo");
        mv.addObject("postList", postList);
        mv.addObject("pageVo", pageVo);
        mv.addObject("findStr", pageVo.getFindStr());

        System.out.println(pageVo);
        mv.setViewName("csy_board/csy_list");
        return mv;
    }

    @RequestMapping(path="/board/post")
    public ModelAndView newPost(CsyBoardVo vo) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("csy_board/csy_post");
        return mv;
    }

    @RequestMapping(path="/board/modify")
    public ModelAndView modifyPost(String sno) {
        ModelAndView mv = new ModelAndView();
        
        Map<String, Object> map = BoardDao.detail(sno);
        mv.addObject("vo", map.get("boardVo"));
        mv.addObject("commentList", map.get("commentList"));

        mv.setViewName("csy_board/csy_modify");
        return mv;
    }

    @RequestMapping(path="/board/delete")
    public String postDelete(String sno) {
        String msg = BoardDao.delete(sno);
        return msg;
    }

    @RequestMapping(path="/board/detail")
    public ModelAndView postDetail(String sno) {
        ModelAndView mv = new ModelAndView();
        Map<String, Object> map = BoardDao.detail(sno);

        CsyBoardVo boardVo = (CsyBoardVo) map.get("boardVo");
        List<CsyBoardCommentVo> commentList = (List<CsyBoardCommentVo>) map.get("commentList");

        mv.addObject("vo", boardVo);
        mv.addObject("commentList", commentList);
        mv.setViewName("csy_board/csy_detail");
        return mv;
    }

    @RequestMapping(path="/board/detail/likePressed", method = RequestMethod.POST)
    public String postDetailLikes(@RequestBody HashMap<String, Object> json) {
        CsyBoardLikesVo vo = new CsyBoardLikesVo();
        vo.setChecked((boolean) json.get("is_checked"));
        vo.setPost_sno((int) json.get("post_sno"));
        vo.setUser_id((String) json.get("user_id"));
        
        return BoardDao.likePressed(vo);
    }

    @RequestMapping("/board/detail/comments/post")
    public boolean boardDetailCommentPost(CsyBoardCommentVo vo) {
        return BoardDao.commentPost(vo);
    }

    @RequestMapping("/board/detail/comments/delete")
    public boolean boardDetailCommentDelete(String sno) {
        return BoardDao.commentDelete(sno);
    }

    @RequestMapping("/board/detail/comments/modify")
    public boolean boardDetailCommentModify(CsyBoardCommentVo vo) {
        return BoardDao.commentModify(vo);
    }
}