package com.team.project.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.CsyBoardDao;
import com.team.project.CsyBoardLikesVo;
import com.team.project.CsyBoardVo;

@RestController
public class csyBoardController {
    @Autowired
    CsyBoardDao BoardDao;
    
    @RequestMapping(path="/board")
    public ModelAndView search(String findStr){
        ModelAndView mv = new ModelAndView();
        List<CsyBoardVo> list = BoardDao.search(findStr);
        mv.addObject("list", list);
        mv.addObject("findStr", findStr);
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
        CsyBoardVo vo = BoardDao.detail(sno);
        mv.addObject("vo", vo);
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
        CsyBoardVo vo = BoardDao.detail(sno);
        mv.addObject("vo", vo);
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

    // // * 추후 이름 수정
    // @RequestMapping(path="/boardpostsubmit", method=RequestMethod.POST)
    // public ModelAndView newPostSubmit(HttpSession httpSession, BoardVo vo) {
    //     ModelAndView mv = new ModelAndView();
    //     mv.setViewName("board/list");
    //     return mv;
    // }
}


// @RestController
// public class boardController2 {
//     @Autowired
//     BoardDao dao;
    
//     static String uploadPath = "C:\\myjob\\th_mysql_board\\board\\src\\main\\resources";

//     @RequestMapping(path="/")
//     public ModelAndView index() {
//         ModelAndView mv = new ModelAndView();
//         mv.setViewName("index");
//         return mv;
//     }

//     @RequestMapping(path="/list")
//     public ModelAndView list(Page page) {
//         System.out.println("ctrl: " + page);
//         ModelAndView mv = new ModelAndView();
//         Map<String, Object> map = dao.list(page);
//         mv.addObject("map", map);
//         mv.setViewName("board/list");
//         return mv;
//     }

//     @RequestMapping(path="/view")
//     public ModelAndView view(Integer sno) {
//         ModelAndView mv = new ModelAndView();
//         Map map = dao.view(sno);
//         mv.addObject("attFiles", map.get("attFiles"));
//         mv.addObject("vo", map.get("vo"));
//         mv.setViewName("board/view");
//     }
// }