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

import jakarta.servlet.http.HttpSession;


@RestController
public class NoticeController {
    @Autowired
    NoticeDao dao;

    public static String upload="C:\\Users\\i\\Documents\\GitHub\\teamProject\\project\\src\\main\\resources\\static\\upload\\";

    @RequestMapping(path="/bjmNoticeList")
    public ModelAndView noticeList(NoticePage page, NoticeVo vo){ // NoticePage page, findStr findStr, NoticeVo vo
        System.out.println(page);
        
        ModelAndView mv = new ModelAndView();
        System.out.println("Controller:"+page.getNowPage());
        if(page.getFindStr() == null){
            page.setFindStr("");
        }
        // int totalRecords = noticeService.getTotalRecords(page.getFindStr());
        // page.setTotSize(totalRecords);
        // page.compute();
        List<NoticeVo> list = dao.noticeList(page,vo);
        
        mv.addObject("list", list);
        mv.addObject("page", page);
        mv.addObject("findStr", page.getFindStr());
        System.out.println("findStr"+page.getFindStr());
        mv.setViewName("bjm_notice/noticeList"); // 깃에서는 notice/noticeList로 변경필요
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
    @RequestMapping(path = "/notice/hit")
    public void noticeHit(@RequestParam Integer sno){
        NoticeVo vo = new NoticeVo();
        System.out.println("Controller Hit : "+vo.getHit());
        System.out.println("Controller : "+sno);
        dao.noticeHit(sno);
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
    @RequestParam("files") List<MultipartFile> files,
    HttpSession session
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

        String id = (String) session.getAttribute("id");
        vo.setId(id);

        System.out.println("여기서 나오나요? " + vo);
        msg = dao.noticeRegisterR(vo, attFiles);
        return msg;
    }

    @RequestMapping(path="/notice/bjmModify")
    public ModelAndView noticeModify(Integer sno){
        ModelAndView mv = new ModelAndView();
        Map<String,Object> map = dao.noticeView(sno);
        NoticeVo vo = (NoticeVo)map.get("vo");
        mv.addObject("vo",vo);
        // System.out.println("Controller:"+vo.getContent());
        mv.setViewName("bjm_notice/noticeModify");
        return mv;
    }
    
    @RequestMapping(path="/notice/bjmModifyR")
    public String noticeModifyR(
        @ModelAttribute NoticeVo vo, 
        @RequestParam("files") List<MultipartFile> files,
        HttpSession session
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

        String id = (String) session.getAttribute("id");
        vo.setId(id);
        
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
        // NoticeVo에 content가 포함된 폼 데이터가 전송됨
        // 여기서 필요한 데이터를 처리하고 데이터베이스에 저장
        return "저장 성공";
    }
}
