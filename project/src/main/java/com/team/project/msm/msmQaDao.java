package com.team.project.msm;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class msmQaDao {

    SqlSession sqlSession;

    public msmQaDao(){
        sqlSession = new MyFactory().getSession();
    }

    public List<msmQaVo> list(){
        return sqlSession.selectList("msmQa.list");
    }
    
    public List<msmQaVo> search(String findStr) {
        return sqlSession.selectList("msmQa.search", findStr);
    }

    public List<msmQaVo> detail(Integer qusNum) {
        return sqlSession.selectList("msmQa.detail", qusNum);
        
    }

    public void saveAnswer(msmQaVo vo) {
        sqlSession.insert("msmQa.saveAnswer", vo);
    }
    
    public void saveQuestion(msmQaVo vo){
        sqlSession.insert("msmQa.saveQuestion", vo);
    }
}
