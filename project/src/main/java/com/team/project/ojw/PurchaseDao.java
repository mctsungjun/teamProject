package com.team.project.ojw;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.project.mybatis.MyFactory;

@Service
@Component
public class PurchaseDao {
    SqlSession session;
    public PurchaseDao(){
        session= new MyFactory().getSession();
    }

    public List<PurchaseVo> purchase_search(String findStr){
        List<PurchaseVo> list = null;
        session = new MyFactory().getSession();
        list = session.selectList("project.purchase_search",findStr);
        session.close();
        return list;
    }

    public PurchaseVo purchase_view(Integer no){
        session = new MyFactory().getSession();
        PurchaseVo vo = session.selectOne("project.purchase_view",no);
        String photo = session.selectOne("purchase_get_photo", vo.getProductCode());
        vo.setPhoto(photo);
        session.close();
        return vo;
    }

    public PurchaseCustomerVo purchase_list(Integer no){
        session = new MyFactory().getSession();
        PurchaseCustomerVo vo = session.selectOne("project.purchase_customer",no);
        System.out.println(vo);
        session.close();
        return vo;
    }

    // * CSY ADDED * //
    public List<ProductVo> purchase_register_list() {
        session = new MyFactory().getSession();
        List<ProductVo> list = session.selectList("project.purchase_get_products");
        System.out.println(list.get(0));
        System.out.println(list.get(1));
        System.out.println(list.get(2));
        System.out.println(list.get(3));
        System.out.println(list.get(4));
        session.close();
        return list;
    }

    public String purchase_register(PurchaseVo vo){
        String msg="";
        session = new MyFactory().getSession();
        int cnt = session.insert("project.purchase_register", vo);
        //륜하 재고 +
        int count=session.selectOne("salestock.checkStock",vo);
        int stockcnt;

        if(cnt>0){
            session.commit();
            msg = "정상적으로 입력됨";
            if(count>0){
                stockcnt=session.update("salestock.stockplusmodify",vo);
            }else{
                stockcnt=session.insert("salestock.stockplusnew",vo);
            }
            if(stockcnt>0){
                session.commit();
            }else{
                session.rollback();
            }
        }else{
            session.rollback();
            msg="저장중 오류발생";
        }
        session.close();
        return msg;
    }

    public String purchase_delete(Integer no){
        session = new MyFactory().getSession();
        String msg = "";
        int cnt = session.delete("project.purchase_delete", no);
        if(cnt>0){
            msg="구매 삭제됨";
            session.commit();
        }else{
            session.rollback();
            msg="구매 삭제중 오류발생";
        }
        session.close();
        return msg;
    }
    @Transactional
    public String purchase_modify(PurchaseVo vo){
        session = new MyFactory().getSession();
        int cnt = session.update("project.purchase_modify",vo);
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


}
