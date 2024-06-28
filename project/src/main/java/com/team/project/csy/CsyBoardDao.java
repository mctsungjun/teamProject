package com.team.project.csy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.team.project.mybatis.MyFactory;

@Component
public class CsyBoardDao {
    SqlSession session;
    public CsyBoardDao() {
        session = MyFactory.getSession();
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

        vo.setLikedByMe(result != 0);
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

    public Map<String, Object> search(CsyBoardListPageVo pageVo) {
        Map<String, Object> map = new HashMap<>();
        List<CsyBoardVo> postList = null;

        System.out.println("BEFORE: " + pageVo);

        int numOfPosts = session.selectOne("csyBoard.numOfPosts", pageVo.getFindStr());
        pageVo.setTotSize(numOfPosts);

        pageVo.pageCompute();
        postList = session.selectList("csyBoard.search", pageVo);
        

        map.put("postList", postList);
        map.put("pageVo", pageVo);

        System.out.println(postList);

        // TODO: 테스트용
        // System.out.println("SEARCH");
        // System.out.println(pageVo);
        // System.out.println(postList);
        return map;
    }

    public String likePressed(CsyBoardLikesVo vo) {
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
