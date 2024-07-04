package com.team.project.sungController;




import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.team.project.passHash.PasswordHash;
import com.team.project.sungDao.MemberDao;
import com.team.project.sungVo.MemberVo;
import com.team.project.sungVo.PhotoVo;
import com.team.project.sung_service.KakaoApi;
import com.team.project.sung_service.NaverAPI;

import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.ModelAttribute;


@RestController

public class MemberController {
    
   @Autowired
    private JavaMailSender javaMailSender; 
   @Autowired
   MemberDao dao; 
   @Autowired
   NaverAPI nApi;

   @Autowired
   KakaoApi kakaoApi;
   String id;
   public static String uploadPath= "C:\\Users\\i\\teamProject\\project\\src\\main\\resources\\static\\upload\\";
    
    // 메인화면 보이기
    // @RequestMapping(path="/index")
    // public ModelAndView index(){
    //     ModelAndView mv = new ModelAndView();
    //     mv.setViewName("index");
    //     return mv;
    // }
    @RequestMapping(path="/login")
public ModelAndView login(){
    ModelAndView mv = new ModelAndView();
    mv.setViewName("sung/login");
    return mv;
}

   // 로그인폼
    @RequestMapping(path="/sung/loginF")
    public ModelAndView loginF(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("sung/login");
        return mv;
    }

   
    //자바스크립트로 받은 로그인정보로 데이타베이스 회원정보확인
    @RequestMapping(path="/sung/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam("id") String id,@RequestParam("password") String password, HttpSession session){
        MemberVo vo = new MemberVo();
        Map<String, Object> response = new HashMap<>();
        if (password.length()>=20){
            vo = dao.loginForgot(id,password);
            
           
        }else{

            vo = dao.login(id,password);
        }
        // 로그인 처리를 위해 dao로 데이터베이스 정보확인 그리고 회원정보 요청
        if(vo !=null){
            //서버세션에 아이디/이름 저장 
            session.setAttribute("id", vo.getId());
            session.setAttribute("name", vo.getName());
            response.put("message", "success");
            
            System.out.println("로그인 되었습니다.");
        }else{
            response.put("message","false");
            System.out.println("아이디, 비번이 틀립니다.");
        }
        return ResponseEntity.ok(response);
    }
    //로그아웃
    @RequestMapping(path="/sung/logout")
    public void logout(HttpSession session){
        System.out.println("로그아웃");
        session.setAttribute("id", null);
        session.setAttribute("name", null);

    }
      //상세페이지로
      @RequestMapping(path="/sung/detail")
      public ModelAndView detail(HttpSession session){
          ModelAndView mv = new ModelAndView();
          MemberVo vo = new MemberVo();
        //서버 세션에서 id값 받아오기
        // dao로 전달
        String id = (String)session.getAttribute("id");
        String name = (String)session.getAttribute("name");
        System.out.println("상세페이지입니다.-----");
        System.out.println(name);
     
        System.out.println("id:"  +id);
        if( id != null && !id.equals("")){

              vo = dao.detail(id,name);
            if(vo.getPhoto() !=null && !vo.getPhoto().equals(" ")){
                for(PhotoVo pv:vo.getPhotos()){
                    if(pv.photo.contains(vo.getPhoto())){
                          vo.setPhoto(pv.photo);;
                        }
                }
            }else{
                PhotoVo defaultPhoto = dao.defaultPhot();
                vo.setPhoto(defaultPhoto.getPhoto());
            }
            
                
                System.out.println(vo);
                  mv.addObject("vo", vo);
                  
                  mv.setViewName("/sung/detail");
                 
                
            }
             // id 값이 null 이거나 공백인 경우 예외 처리합니다.
       else if( id == null || id.trim().isEmpty()){
            mv.addObject("logout", "logout");
            mv.setViewName("redirect:/sung/login");  // 로그인 페이지로 리다이렉트합니다.
        }
        return mv;
        }
      // 리스트 목록에서 클릭 상세페이지
      @RequestMapping(path="/sung/view")
      public ModelAndView view(String id){
        ModelAndView mv = new ModelAndView();
        String name = dao.getMemberName(id);
        System.out.println(name);
        MemberVo vo = dao.detail(id,name);
        if(vo.getPhoto() !=null && !vo.getPhoto().equals(" ")){
          for(PhotoVo pv:vo.getPhotos()){
              if(pv.photo.contains(vo.getPhoto())){
                  vo.setPhoto(pv.photo);;
              }
          }
        }
      System.out.println(vo);
        mv.addObject("vo", vo);
        
        mv.setViewName("sung/detail");
        return mv;
      }

      
      //이미지/파일 업로드
      @RequestMapping(path="/sung/upload")
      public String fileUpload(@RequestParam("files") MultipartFile[] photo, HttpSession session, @RequestParam("reprePhoto") String reprePhoto){
        //ModelAndView mv = new ModelAndView();
        List<PhotoVo> photos = new ArrayList<>();
        MemberVo vo = new MemberVo();
        if (photo != null){
            UUID uuid = null;
            String sysFile = "";
            for(MultipartFile f : photo){
                if(f.getOriginalFilename().equals("")){
                    continue;
                }
                // 파일업로드
                uuid = UUID.randomUUID();
                sysFile = String.format("%s-%s",uuid,f.getOriginalFilename());
                File savefile = new File(uploadPath+sysFile);
                try{
                    f.transferTo(savefile);
                }catch(Exception e){
                    e.printStackTrace();
                }
                PhotoVo pv = new PhotoVo();
               
                pv.setOriPhoto(f.getOriginalFilename());
                pv.setPhoto(sysFile);
                photos.add(pv);
                System.out.println(f.getOriginalFilename());

            }
            if(photos.size()>0){
                vo.setPhotos(photos);
                vo.setPhoto(reprePhoto);
                vo.setId((String)session.getAttribute("id"));
                System.out.println("vo: " +vo.getPhoto());
            }
        }
        String msg = dao.fileUpload(vo);
        return msg;
      }
// 수정폼/정보가져오기
@RequestMapping(path="/sung/modify" )
public ModelAndView updateFrom(HttpSession session){
    ModelAndView mv = new ModelAndView();
    String id = (String)session.getAttribute("id");
    MemberVo vo = dao.updateFrom(id);
    mv.addObject("vo", vo);
    mv.setViewName("sung/update");
    return mv;

}

// 수정정보받아서 
@RequestMapping(path="/sung/updateR")
public String updateR(@RequestParam("files") List<MultipartFile> photo ,String[] delFiles, @ModelAttribute MemberVo vo ){
    List<PhotoVo> photos = new ArrayList<>();

    UUID uuid = null;
    String sysFile = null;
    if(photo !=null && photo.size()>0){
        for(MultipartFile f : photo){
            if(f.getOriginalFilename().equals("")){
                continue;
            }
            PhotoVo v = new PhotoVo();
            uuid = UUID.randomUUID();
            sysFile = String.format("%s-%s", uuid,f.getOriginalFilename());

            File saveFile = new File(uploadPath+sysFile);
            try{
                f.transferTo(saveFile);
            }catch(Exception e){
                e.printStackTrace();
            }

            v.setPhoto(sysFile);
            v.setOriPhoto(f.getOriginalFilename());
            photos.add(v);
        }
        if (photos.size()> 0){
            vo.setPhotos(photos);
        }
    }
        String msg = dao.modify(vo, delFiles);
     return msg;
    }



//대표이미지 수정폼
@RequestMapping(path="/sung/repreChangeForm")
public ModelAndView repreChangForm(HttpSession session){
    ModelAndView mv = new ModelAndView();
    String id = (String)session.getAttribute("id");
   
    String name = (String)session.getAttribute("name");
    
    MemberVo vo =dao.detail(id,name);
    mv.addObject("vo", vo);
    mv.setViewName("sung/reprePhoto");
    return mv;
}
//대표이미지 바꾸기
    @RequestMapping(path="/sung/changePhoto")
    public String changePhoto(HttpSession session, String photo){
        String id =(String)session.getAttribute("id");
        String msg = dao.changePhoto(id, photo);
        return msg;
    }
//리스트 폼으로 가기
    @RequestMapping(path="/sung/list")
    public ModelAndView list(String code){
        ModelAndView mv = new ModelAndView();
        System.out.println(code);
        List<MemberVo> list = new ArrayList<>();
        list = dao.list(code);
        System.out.println(list);
        mv.addObject("list", list);
        mv.setViewName("sung/list");
        return mv;
    }
// 리스트 목록에서 검색
    @RequestMapping(path="/sung/search")
    public ModelAndView search(String findStr){
        System.out.println("검색어  "+findStr);
        ModelAndView mv = new ModelAndView();
        List<MemberVo> list = new ArrayList<>();
        list = dao.search(findStr);
       
        mv.addObject("list", list);
        mv.setViewName("sung/list");
        return mv;
    }

  
  
    //회원등록폼
    @RequestMapping(path="/sung/registerF")
    public ModelAndView registerF(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("sung/register");
        return mv;
    }
    //회원등록
    @RequestMapping(path="/sung/registerR" ,method=RequestMethod.POST )
    public String registerR(@ModelAttribute MemberVo vo){
        
        System.out.println("컨트롤러입니다 :"+vo);
        //비번을 암호화 처리함
        String passwordHash = PasswordHash.hashPassword(vo.getPassword());
        
        boolean b= false;
        //dao로 정보를 보내서 true/false 받음
        b= dao.registerR(vo,passwordHash);
        if(b){
            return "ok";
        }else{

            return "fail";
        }
       
       
    }
    //아이디중복확인
    @RequestMapping(path="/memberId/chk")
    public int userIdchk(@RequestParam("userId") String id ){
        String matchId = dao.userIdchk(id);
        System.out.println("usedId:  "+matchId);
        if(matchId.equals("ok")){
            return 0;
        }else{
            return 1;

        }

    }

    //아이디/비번 찿기form
    @RequestMapping(path="/sung/findIdPwd")
    public ModelAndView findIdPwdForm(){

        ModelAndView mv = new ModelAndView();
        mv.setViewName("sung/findIdPw");
        
        return mv;
    }
    //비밀번호 찾기
    @RequestMapping(path="/sung/passSearch")
    public ResponseEntity<Map<String, Object>> findPass(@RequestParam("name") String name,@RequestParam("email") String email){
        String[] email1=email.split("@");
        Map<String,Object> response = new HashMap<>();
        int index = 1;
        if(index >=0 && index < email1.length){
            System.out.println(email1[0]+"   "+email1[1]+"  ");
            MemberVo vo = dao.findPass(name, email1[0].trim(),email1[1].trim());
            if(vo != null){
                String id = vo.getId();
                String password = vo.getPassword();
                // 아이디/비번 메일로 보내주기
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email1[0]+"@"+email1[1]);
                message.setSubject("아이디와 비번 보냅니다.");
                message.setText("id: "+vo.getId()+" password: "+vo.getPassword());
                javaMailSender.send(message);
                response.put("message","ok");
                System.out.println(id +","+ password);

                return ResponseEntity.ok(response);
            }else{
                response.put("message","unKnow");
                return ResponseEntity.ok(response);
            }
            
        }else{
            response.put("message","이메일을 다시 적어주세요");
            return ResponseEntity.ok(response);
        }
        
        
}
    //리스트폼


    //네이버 로그인
    @RequestMapping(path="/naver/callback")
    // 네이버로 부터 받은 정보 code / state 를 가지고
    public ModelAndView login(@RequestParam("code") String code,@RequestParam("state") String state, HttpSession session, HttpServletRequest request) throws IOException {
        // 토근파일을 받기위해 serviec 폴더의 NaverApi.java로이동
      String accessToken = nApi.gettoken(code,state);  

      session = request.getSession();
    //   System.out.println("session:"+session);
      ModelAndView mv = new ModelAndView();
      
      MemberVo vo =null;
      // 받은 토큰을 이용해서 다시 NaverApi.java파일의 userInfo()로 보냄
      vo = nApi.userInfo(accessToken);
      
      //네이버 아이디 데이타 베이스 등록
      String resp = dao.neverIdR(vo);
    
      System.out.println(resp);
      //연결끊기
       String msg = nApi.connectionOff(accessToken);

       System.out.println(msg);
      // 세션에 담기
      
      session.setAttribute("id", resp);
      session.setAttribute("name", vo.getName());
     
      //네이버 팝어창으로 다시 이동
        mv.setViewName("sung/navercallback");
    return  mv;
        
}



//카카오 로그인
@RequestMapping(path="kakao/callback")
public ModelAndView kakaoLogin(@RequestParam("code") String code, HttpSession session) throws IOException{
    MemberVo vo=null;
    //code를 이용해서 토큰받아오기 
    String accessToken = kakaoApi.getAccessToken(code);
    //System.out.println("code: "+ code);
    ModelAndView mv = new ModelAndView();
    //받은 토큰을 이용해서 유저정보 받기
    vo = kakaoApi.userInfo(accessToken);
    System.out.println(vo.getBirthday());
    //카카오 아이디 데이타 베이스 등록
    String resp = dao.kakaoIdR(vo);
    System.out.println("카카오로그인: "+resp);
    session.setAttribute("id", resp);
    session.setAttribute("name", vo.getName());
    
    mv.setViewName("sung/kakaocallback");
    return mv;
    }

// 회원탈퇴
    @RequestMapping(path="/sung/memberOff")
    public String memberOff(HttpSession session){
        
        String id = (String)session.getAttribute("id");
        String msg = dao.memberDelete(id);
        
       
        return msg;
    }    
}
