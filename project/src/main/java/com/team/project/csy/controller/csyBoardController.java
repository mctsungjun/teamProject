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

        // TODO: 일단 보존
        // pageVo.setStartNo((pageVo.getNowPage() == 1) ? 1 : pageVo.getListSize() * pageVo.getNowPage());


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

















    
/* Home 메뉴 버튼이 클릭되었을 때 */
// @RequestMapping("/top10")
// public ModelAndView top10(CsyBoardListPageVo page, String menu) {
//     ModelAndView mv = new ModelAndView();
//     List<BoardVo> list = null;

//     list = BoardDao.page(page);
//     mv.addObject("subTitle", "최신 top10");
//     mv.addObject("top10List", list);
//     mv.addObject("menu", menu);
//     mv.setViewName("board/top_10");

//     /* 메뉴(조회, 댓글, 최신)에 따라 분기 */

//     // switch (menu) {


//     //     case "hit":
//     //         list = BoardDao.hitTop10(page);
//     //         mv.addObject("subTitle", "조회 top10");
//     //         mv.addObject("top10List", list);
//     //         mv.addObject("menu", menu);
//     //         mv.setViewName("board/top_10");
//     //         break;

//     //     case "repl":
//     //         list = BoardDao.replTop10(page);
//     //         mv.addObject("subTitle", "댓글 top10");
//     //         mv.addObject("top10List", list);
//     //         mv.addObject("menu", menu);
//     //         mv.setViewName("board/top_10");
//     //         break;

//     //     case "newer":
//     //         list = BoardDao.newerTop10(page);
//     //         mv.addObject("subTitle", "최신 top10");
//     //         mv.addObject("top10List", list);
//     //         mv.addObject("menu", menu);
//     //         mv.setViewName("board/top_10");
//     //         break;
//     // }

//     return mv;
// }



// @RequestMapping("/list")
// public ModelAndView list(String menu,  CsyBoardListPageVo page) {

//     ModelAndView mv = new ModelAndView();
//     List<CsyBoardVo> list = null;
//     list = BoardDao.newerTop10(page);

//     // switch(menu){
//     //     case "hit":
//     //         list = BoardDao.hitTop10(page);
//     //         break;
//     //     case "repl":
//     //         list = BoardDao.replTop10(page);
//     //         break;
//     //     case "newer":
//     //         list = BoardDao.newerTop10(page);
//     //         break;
//     // }
    
//     mv.addObject("page", BoardDao.getPage());
//     mv.addObject("list", list);

//     mv.setViewName("board/list");
//     return mv;
// }











}