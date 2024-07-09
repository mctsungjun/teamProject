package com.team.project.ojw;

<<<<<<< HEAD
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
=======
import java.util.List;
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;

@Service
@Component
public class ProductDao {
    SqlSession session;
    public ProductDao(){
        session = new MyFactory().getSession();
    }
    
    public List<ProductVo> product(String findStr){
        List<ProductVo> list = null;
        session = new MyFactory().getSession();
        list = session.selectList("project.product_search",findStr);
        session.close();
        return list;
    }

<<<<<<< HEAD
    public ProductVo product_view(Integer no){
        ProductVo vo = null;
        session = new MyFactory().getSession();
        vo = session.selectOne("project.product_view",no);
        List<ojw_PhotoVo> photos = session.selectList("project.photos",no);
=======
    
    public ProductVo product_view(String productCode){
        session = new MyFactory().getSession();
        ProductVo vo = session.selectOne("project.product_view",productCode);
        List<ojw_PhotoVo> photos = session.selectList("project.photos",productCode);
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
        vo.setPhotos(photos);
        session.close();
        return vo;
    }
    
    @Transactional
    public String product_register(ProductVo vo){
        String msg="";
        session = new MyFactory().getSession();

        int cnt = session.insert("project.product_register", vo);
        if(cnt>0){
            session.commit();
            msg="정상적으로 입력됨";
        }else{
            session.rollback();
            msg="저장중 오류발생";
        }
        session.close();
        return msg;
    }
<<<<<<< HEAD

    public String product_delete(String productCode){
        session = new MyFactory().getSession();
        String msg = "";
        int cnt = session.delete("project.product_delete", productCode);
        if(cnt>0){
            //파일 삭제
            List<ojw_PhotoVo> delPhotos = session.selectList("project.photos", productCode);
            if(delPhotos != null){
                for(ojw_PhotoVo v : delPhotos){
                    File delFile = new File(ProductController.ojw_upload + v.getPhoto());
                    if(delFile.exists()) delFile.delete();
                }
            }
            session.delete("project.product_delete", productCode);
            session.commit();
            msg = "삭제 완료";
        }else{
            session.rollback();
            msg = "삭제중 오류발생";
        }
        session.close();
        return msg;
    }
    public String product_modify(ProductVo vo){
        session = new MyFactory().getSession();
        int cnt = session.update("project.product_modify",vo);
        String msg="";

        if(cnt>0){
            msg="수정 완료";
            session.commit();
        }else{
            msg="수정 실패";
            session.rollback();
        }
        session.close();
        return msg;
    }

    public String changeProductPhoto(String productCode, String photo){
        String msg = "";
        session = new MyFactory().getSession();
        Map<String, String> map = new HashMap<>();
        map.put("productCode", productCode);
        map.put("photo", photo);
        int cnt = session.update("project.change_productPhoto", map);
        if(cnt > 0){
            msg = "대표이미지 수정 완료";
            session.commit();
        }else{
            msg = "대표이미지 수정중 오류 발생";
            session.rollback();
        }
        session.close();
        return msg;
    }

    public String product_modify(ProductVo vo, String[] delFiles) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'product_modify'");
    }
=======
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
}
