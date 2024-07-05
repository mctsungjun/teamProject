package com.team.project.bjm;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class NoticeController {
    @Autowired
    NoticeDao dao;

    public static String upload="C:\\workspace-github-backup\\github\\project\\src\\main\\resources\\static\\upload\\";

    @RequestMapping(path="/bjmNoticeList")
    public ModelAndView noticeList(NoticePage page,NoticeVo vo){
        ModelAndView mv = new ModelAndView();
        System.out.println("Controller:"+page.getNowPage());
        if(page.getFindStr() == null){
            page.setFindStr("");
        }

        List<NoticeVo> list = dao.noticeList(page,vo);
        
        mv.addObject("list", list);
        mv.addObject("page", page);
        mv.addObject("findStr", page.getFindStr());
        System.out.println("findStr"+page.getFindStr());
        mv.setViewName("bjm_notice/noticeList");
        return mv;
    }

    @RequestMapping(path="/notice/bjmNoticeView")
    public ModelAndView noticeView(Integer sno){
        ModelAndView mv = new ModelAndView();

        Map<String,Object> map = dao.noticeView(sno);
        mv.addObject("attFiles", map.get("attFiles"));
        mv.addObject("vo", map.get("vo"));
        mv.setViewName("bjm_notice/noticeview");
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
        vo.setId("12345");
        msg = dao.noticeRegisterR(vo, attFiles);
        return msg;
    }

    @RequestMapping(path="/notice/bjmModify")
    public ModelAndView noticeModify(Integer sno){
        ModelAndView mv = new ModelAndView();
        Map<String,Object> map = dao.noticeView(sno);
        NoticeVo vo = (NoticeVo)map.get("vo");
        mv.addObject("vo",vo);
        mv.setViewName("bjm_notice/noticeModify");
        return mv;
    }
    
    @RequestMapping(path="/notice/bjmModifyR")
    public String noticeModifyR(
        @ModelAttribute NoticeVo vo, 
        @RequestParam("files") List<MultipartFile> files
    ){
        String msg ="";
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
        vo.setId("12345");
        msg = dao.noticeModifyR(vo, attFiles);
        return msg;
    }
    
    @RequestMapping(path="/notice/bjmDelete")
    public String noticeDelete(Integer sno){
        String msg = dao.noticeDelete(sno);
        return msg;
    }
    @PostMapping("/uploadImage")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) {
        String uploadDir = "/path/to/upload/directory";
        String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

    try{
        File uploadFile = new File(uploadDir, filename);
        file.transferTo(uploadFile);
        String fileUrl = "/uploads/" + filename;
        Map<String, String> response = new HashMap<>();
        response.put("url", fileUrl);
        return response;
    }catch(IOException e) {
        e.printStackTrace();
        throw new RuntimeException("File upload failed", e);
    }
}
    
    @PostMapping("/noticeRegister")
    public String noticeRegister(@ModelAttribute NoticeVo vo) {
        return "저장 성공";
    }
}
