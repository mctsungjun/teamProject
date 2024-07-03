package com.team.project.csy;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class CsyBoardDao {
    SqlSession session;
    public CsyBoardDao() {
        session = new MyFactory().getSession();
    }

    public CsyBoardVo detail(String sno) {
        CsyBoardVo vo = null;
        // * 조회수는 그렇게 중요한건 아니니까 성공실패여부 안봄
        int cnt = session.update("csyBoard.addHits", sno);
        if(cnt>0) { session.commit();
        } else { session.rollback(); }
        vo = session.selectOne("csyBoard.detail", sno);

        vo.setViewersId("SampleID");
        int result = session.selectOne("csyBoard.detailLikedByMe", vo);
        System.out.println("DETAIL PAGE: ");
        System.out.println(result);

        vo.setLikedByMe(result != 0);
        System.out.println(vo);
        return vo;
    }

    public boolean post(CsyBoardVo vo) {
        boolean b = false;
        vo.content = vo.content.replaceAll("<p><br></p>", "");
        int cnt = session.insert("csyBoard.post", vo);
        if(cnt>0){
            b=true;
            session.commit();
        }else{
            b=false;
            session.rollback();
        }
        return b;
    }

    public boolean modify(CsyBoardVo vo) {
        System.out.println(vo);
        boolean b = false;
        vo.content = vo.content.replaceAll("<p><br></p>", "");
        int cnt = session.insert("csyBoard.modify", vo);
        if(cnt>0){
            b=true;
            session.commit();
        }else{
            b=false;
            session.rollback();
        }
        return b;
    }

    public String delete(String sno) {
        int cnt = session.insert("csyBoard.delete", sno);
        String msg = "게시물 삭제에 실패했습니다.";
        if(cnt>0){
            msg = "게시물 삭제를 완료했습니다.";
            session.commit();
        }else{
            session.rollback();
        }
        return msg;
    }

    public List<CsyBoardVo> search(String findStr) {
        if (findStr == null) findStr = "";
        List<CsyBoardVo> list = null;
        list = session.selectList("csyBoard.search", findStr);
        return list;
    }

    public String likePressed(CsyBoardLikesVo vo) {
        System.out.println(vo);
        
        String msg = "POST LIKE FAILED";
        int cnt = session.insert((vo.isChecked) ? "csyBoard.postLikePressed" : "postLikeUnpressed", vo);

        if(cnt>0){
            msg = "POST LIKE SUCCEED";
            session.commit();
        }else{
            session.rollback();
        }
        return msg;
    }
}
