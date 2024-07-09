package com.team.project.msm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class msmQaDao {
    
    SqlSession session;

    public msmQaDao(){
        session=new MyFactory().getSession();
    }

    public List<msmQaVo> list(String findStr){
        return session.selectList("msmQa.list", findStr);
    }
    
    public List<msmQaVo> search(String findStr){
        List<msmQaVo> list = null;
        session = new MyFactory().getSession();
        list = session.selectList("qa.search", findStr);
        
        return list;
    }

    public Map<String, Object> detail(Integer qusNum) {
        Map<String, Object> Map = new HashMap<>(); 
        session = new MyFactory().getSession();
        msmQaVo vo = session.selectOne("msmQa.view", qusNum);
        List<msmQaVo> qaFiles = session.selectList("msmQa.qaFiles", qusNum);

        Map.put("vo", vo);
        Map.put("qaFiles", qaFiles);
        
        return Map;
    }
}
