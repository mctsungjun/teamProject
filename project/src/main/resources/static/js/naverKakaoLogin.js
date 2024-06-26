// 네이버로그인
let openNaver = () => {
    // 요청할 URL
    var oauthUrl = "https://nid.naver.com/oauth2.0/authorize";
    
    // GET 방식으로 인증 페이지로 사용자를 리디렉션할 파라미터 컨트롤로 naver/callback으로 넘어감
    var params = {
        response_type: "code",
        client_id: "De0kPxQwyc06a1EHZFqe",
        state: "STATE_STRING",
        redirect_uri: "http://localhost:8989/naver/callback" // 여기에 설정한 리디렉션 URI 입력
    };
    
    // 인증 페이지로 리디렉션할 URL 생성
    var authUrl = oauthUrl + "?" + $.param(params);
    
    // 새 창 열기
let authWindow = window.open(authUrl, "_blank", "width=500,height=600");
window.addEventListener('message', function(event) {
    // event.data에서 새 창에서 전송한 데이터를 받음
    console.log('받은 데이터:', event.data);

    
}, true);
};

 // 카카오로그인 
 let openkakao = ()=>{
    var oauthUrl = "https://kauth.kakao.com/oauth/authorize";
    var params = {
        response_type:"code",
        client_id:"68b710cf40f23044e64ce95791eed9ac",
        redirect_uri:"http://localhost:8989/kakao/callback",
    }
    var buthUrl = oauthUrl + "?" + $.param(params);
   let authWindow = window.open(buthUrl, "_blank", "width=500,height=600");
}