package com.team.project.mybatis;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

<<<<<<< HEAD
=======

>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac
public class MyFactory {
    public SqlSession session;
    
    public MyFactory(){
        try{
            String path="com/team/project/mybatis/config.xml";
            Reader reader = Resources.getResourceAsReader(path);
            SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
            session = factory.openSession();
        }catch(Exception ex){
            ex.printStackTrace();
        }
    }
    public SqlSession getSession(){
        return session;
    }
}
