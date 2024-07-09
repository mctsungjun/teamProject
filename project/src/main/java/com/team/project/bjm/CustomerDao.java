package com.team.project.bjm;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;



@Component
public class CustomerDao {
    SqlSession session;

    public CustomerDao(){
        session = new MyFactory().getSession();
    }
    
    public List<CustomerVo> customerList(String findStr){ // CustomerPage page
        // int totSize = session.selectOne("customer.totSize",page.getFindStr());
        // page.setTotSize(totSize);
        // page.compute();
        // List<CustomerVo> list = session.selectList("customer.search", page);
        List<CustomerVo> list = session.selectList("customer.search", findStr);
        
        // System.out.println("Dao"+list);
        return list;
    }
    
    public CustomerVo customerView(String businessNumber){
        CustomerVo vo = session.selectOne("customer.view",businessNumber);
        return vo;
    }

    public String customerRegister(CustomerVo vo){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        vo.setRegistrationDate(sdf.format(new Date()));
        String msg = "";
        int cnt = session.insert("customer.register",vo);
        if(cnt > 0){
            session.commit();
        }else{
            msg = "Register ERROR";
            session.rollback();
        }
        return msg;
    }

    public String customerModify(CustomerVo vo){
        String msg = "";
        int cnt = session.update("customer.modify",vo);
        if(cnt > 0){
            session.commit();
        }else{
            msg="Update ERROR";
            session.rollback();
        }
        return msg;
    }

    public String customerDelete(CustomerVo vo){
        String msg = "";
        int cnt = session.delete("customer.delete",vo);
        if(cnt > 0){
            session.commit();
        }else{
            msg = "Delete ERROR";
            session.rollback();
        }
        return msg;
    }
}
