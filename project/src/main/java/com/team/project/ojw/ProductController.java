package com.team.project.ojw;

import java.util.List;
import java.util.UUID;
import java.io.File;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ProductController {
    @Autowired
    ProductDao ProductDao;

    //upload 경로
    public static String upload = "C:\\Project\\Final_Project\\project\\src\\main\\resources\\static\\ojw_upload\\";

    @RequestMapping(path="/product")
    public ModelAndView product(String findStr){
        ModelAndView mv = new ModelAndView();
        List<ProductVo> list = ProductDao.product(findStr);
        mv.addObject("product", list);
        mv.setViewName("ojw/product");
        return mv;
    }

    @RequestMapping(path="/product_register")
    public ModelAndView product_register(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("ojw/product_register");
        return mv;
    }

    @RequestMapping(path="/product_registerR")
    public String product_registerR(
            @RequestParam("files")List<MultipartFile> photo,
            @ModelAttribute ProductVo vo){
        ModelAndView mv = new ModelAndView();
        List<ojw_PhotoVo> photos = new ArrayList<>();

        if (photo != null){
            UUID uuid = null;
            String sysFile = "";

            for (MultipartFile f : photo){
                if (f.getOriginalFilename().equals("")) continue;

                // 파일 전송 및 저장
                uuid = UUID.randomUUID();
                sysFile = String.format("%s-%s", uuid, f.getOriginalFilename());
                File saveFile = new File(upload+sysFile);

                try{
                    f.transferTo(saveFile);
                }catch(Exception ex){
                    ex.printStackTrace();
                }

                ojw_PhotoVo v = new ojw_PhotoVo();
                vo.setPhoto(sysFile);
                v.setPhoto(sysFile);
                v.setOriPhoto(f.getOriginalFilename());
                photos.add(v);
            }
            // get.Photo : 라디오버튼에서 선택된 파일 / getOriginalFilename : 업로드되는 파일명
            if(photos.size()>0){
                vo.setPhotos(photos);
            }
        }
        String msg = ProductDao.product_register(vo);
        mv = product("");
        mv.addObject(msg, msg);
        return msg;
        }
}
