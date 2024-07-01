package com.team.project.bjm;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class NoticeController {
    @Autowired
    NoticeDao dao;

    public static String upload="C:\\gitproject\\n" + //
                "otice\\src\\main\\resources\\static\\upload\\";

    @RequestMapping(path="/bjmNoticeList")
    public ModelAndView noticeList(NoticePage page,NoticeVo vo){ // NoticePage page, findStr findStr, NoticeVo vo
        ModelAndView mv = new ModelAndView();
        if(page.getFindStr() == null){
            page.setFindStr("");
        }
        
        List<NoticeVo> list = dao.noticeList(page,vo);
        
        mv.addObject("list", list);
        mv.addObject("page", page);
        mv.addObject("findStr", page.getFindStr());

        mv.setViewName("bjm_notice/noticeList"); // 깃에서는 notice/noticeList로 변경필요
        return mv;
    }
    @RequestMapping(path="/notice/bjmRegister")
    public ModelAndView noticeRegister(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("bjm_notice/noticeregister");
        return mv;
    }
    @RequestMapping(path="/notice/bjmRegisterR")
    public String noticeRegisterR(
    @ModelAttribute NoticeVo vo, 
    @RequestParam("files") List<MultipartFile> files
){
        String msg = "저장성공";
        List<NoticeAtt> attFiles = new ArrayList<>();
        UUID uuid = null;
        String sysFile = "";
        for(MultipartFile f : files){
            if(f.getSize()<=0)continue;
            uuid=UUID.randomUUID();
            sysFile = String.format("%s-%s",uuid, f.getOriginalFilename());
            File saveFile = new File(upload+sysFile);
            try{
                f.transferTo(saveFile);
            }catch(Exception e){
                e.printStackTrace();
            }
            NoticeAtt att = new NoticeAtt();
            att.setOriFile(f.getOriginalFilename());
            att.setSysFile(sysFile);
            attFiles.add(att);
        }
        msg = dao.noticeRegisterR(vo);
        return msg;
    }
    
    @RequestMapping(path="/notice/bjmNoticeView")
    public ModelAndView noticeView(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("bjm_notice/noticeView");
        return mv;
    }
    @RequestMapping(path="/notice/bjmModify")
    public ModelAndView noticeModify(/*String sno */){
        ModelAndView mv = new ModelAndView();
        // Map<String,Object> map = dao.view(sno);
        // mv.addObject("vo",map.get("vo"));
        mv.setViewName("bjm_notice/noticeModify");
        return mv;
    }
    /*
    @RequestMapping(path="/notice/bjmModifyR")
    public String modifyR(NoticeVo vo)
    String msg ="";
    msg= dao.modifyR(vo);
    return msg;
    */
    @RequestMapping(path="/notice/bjmDelete")
    public String noticeDelete(Integer sno){
        String msg = dao.noticeDelete(sno);
        return msg;
    }
}
