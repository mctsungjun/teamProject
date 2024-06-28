package com.team.project.krh;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.team.project.mybatis.MyFactory;
import org.springframework.transaction.annotation.Transactional;
@Service
@Component
public class SaleDao {
    SqlSession session;
    public SaleDao(){
        session=MyFactory.getSession();
    }

    public List <SaleVo> search(String findStr){
        List<SaleVo> list=null;
        session=MyFactory.getSession();
        list = session.selectList("salestock.search",findStr);
        return list;
    }

    public SaleVo sale_view(Integer sno){
        session=MyFactory.getSession();
        SaleVo vo=session.selectOne("salestock.list",sno);
        return vo;
    }

    public SaleVo select(Integer sno){
        System.out.println("sno:"+sno);
        SaleVo vo=null;
        session=MyFactory.getSession();
        vo = session.selectOne("salestock.select",sno);
        return vo;
    }

    public SaleVo sale_list(Integer sno){
        session=MyFactory.getSession();
        SaleVo vo=session.selectOne("salestock.list",sno);
        return vo;
    }
    
    @Transactional
    public String sale_view_modify(SaleVo vo){
        session=MyFactory.getSession();
        int cnt=session.update("salestock.update", vo);
        String msg="";
        if(cnt>0){
            msg="정상적으로 수정되었습니다.";
            session.commit();
        }else{
            msg="수정에 실패하였습니다.";
            session.rollback();
        }
        return msg;
    }
}
