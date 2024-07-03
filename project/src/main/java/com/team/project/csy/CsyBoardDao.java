package com.team.project.csy;

import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Component;

// * 깃 재업로드용 주석
@Component
public class CsyBoardDao {

    public SqlSession getSession() {
        SqlSession session = null;
        try{
            Reader reader = Resources.getResourceAsReader("com/team/project/mybatis/config.xml");
        SqlSessionFactory factory = 
            new SqlSessionFactoryBuilder().build(reader);
            session = factory.openSession();
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return session;
    }

    SqlSession session = getSession();
    


    public Map<String, Object> detail(String sno) {
        Map<String, Object> map = new HashMap<String, Object>();
        CsyBoardVo boardVo;

        // * BoardVo 관련 */
        // * 조회수는 그렇게 중요한건 아니니까 성공실패여부 안봄
        int cnt = session.update("csyBoard.addHits", sno);
        if(cnt>0) { session.commit();
        } else { session.rollback(); }
        boardVo = session.selectOne("csyBoard.detail", sno);

        boardVo.setViewersId("SampleID");
        int result = session.selectOne("csyBoard.detailLikedByMe", boardVo);
        
        boardVo.setLikedByMe(result != 0);

        // * COMMENTS 관련 */
        List<CsyBoardCommentVo> commentList = session.selectList("csyBoard.commentList", sno);

        for (CsyBoardCommentVo comment : commentList) {
            comment.replies = session.selectList("csyBoard.commentListReply", comment);
        }

        System.out.println(commentList);
        map.put("boardVo", boardVo);
        map.put("commentList", commentList);

        return map;
    }

    public int post(CsyBoardVo vo) {
        int sno = -1;
        vo.content = vo.content.replaceAll("<p><br></p>", "");
        session.insert("csyBoard.post", vo);
        sno = vo.getSno();
        if(sno != -1){
            session.commit();
            return sno;
        }else{
            session.rollback();
            return sno;
        }
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


    public boolean commentPost(CsyBoardCommentVo vo) {
        boolean isSucceeded = false;
        int cnt = session.insert("csyBoard.commentPost", vo);

        if(cnt>0){
            session.commit();
            isSucceeded = true;
        }else{
            session.rollback();
        }
        return isSucceeded;
    }

    public boolean commentDelete(String sno) {
        boolean isSucceeded = false;
        int cnt;

        int numOfReplies = session.selectOne("csyBoard.commentNumberOfReplies", Integer.parseInt(sno));
        System.out.println(numOfReplies);
        if (numOfReplies == 0) {
            cnt = session.delete("csyBoard.commentDelete", Integer.parseInt(sno));
        } else {
            CsyBoardCommentVo vo = new CsyBoardCommentVo();
            vo.setSno(Integer.parseInt(sno));
            vo.setId("DELETED COMMENT");
            vo.setContent("삭제된 덧글입니다.");
            cnt = session.update("csyBoard.commentModify", vo);
        }
        
        if(cnt>0) {
            session.commit();
            isSucceeded = true;
        }else{
            session.rollback();
        }

        return isSucceeded;
    }

    public boolean commentModify(CsyBoardCommentVo vo) {
        boolean isSucceeded = false;
        int cnt = session.update("csyBoard.commentModify", vo);

        if(cnt>0){
            session.commit();
            isSucceeded = true;
        }else{
            session.rollback();
        }
        return isSucceeded;
    }
}
