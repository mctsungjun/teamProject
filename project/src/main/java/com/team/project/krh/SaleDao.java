package com.team.project.krh;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;
import com.team.project.ojw.ProductVo;
@Service
@Component
public class SaleDao {
    SqlSession session;
    public SaleDao(){
        session=new MyFactory().getSession();
    }

    public List <SaleVo> search(String findStr){
        List<SaleVo> list=null;
        session=new MyFactory().getSession();
        list = session.selectList("salestock.search",findStr);
        session.close();
        return list;
    }

    public SaleVo sale_view(Integer sno){
        session=new MyFactory().getSession();
        SaleVo vo=session.selectOne("salestock.view",sno);
        String photo = session.selectOne("purchase_get_photo", vo.getProductCode());
        vo.setPhoto(photo);
        session.close();
        return vo;
    }

    public SaleVo select(Integer sno){
        System.out.println("sno:"+sno);
        SaleVo vo=null;
        session=new MyFactory().getSession();
        vo = session.selectOne("salestock.select",sno);
        session.close();
        return vo;
    }


    public SaleWithUsersVo sale_list(Integer sno){
        session=new MyFactory().getSession();
        SaleWithUsersVo vo=session.selectOne("salestock.list",sno);
        System.out.println(vo);
        session.close();
        return vo;
    }
    
    @Transactional
    public String sale_view_modify(SaleVo vo){
        session= new MyFactory().getSession();

        int cnt=session.update("salestock.update", vo);
        String msg="";
        if(cnt>0){
            msg="정상적으로 수정되었습니다.";
            session.commit();
        }else{
            msg="수정에 실패하였습니다.";
            session.rollback();
        }
        session.close();
        return msg;
    }

    public String delete(Integer sno){
        session=new MyFactory().getSession();
        int cnt=session.delete("salestock.deletesale", sno);
        String msg="";
        if(cnt>0){
            msg="삭제가 완료됐습니다.";
            session.commit();
        }else{
            msg="삭제 중 오류가 발생하였습니다.";
            session.rollback();
        }
        System.out.println(msg);
        session.close();
        return msg;
    }

    // * CSY ADDED * //
    public List<ProductVo> product_list() {
        session = new MyFactory().getSession();
        List<ProductVo> list = session.selectList("project.purchase_get_products");
        session.close();
        return list;
    }
}
