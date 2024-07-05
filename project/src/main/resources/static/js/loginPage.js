export function loginPage() {
    // * "글 목록" 텍스트 클릭시 전체 리스트 보여줌
    let boardListTitle = document.querySelector("#loginBtn");
    boardListTitle.onclick = (event) => {
        event.preventDefault(); // 기본 이벤트 동작 방지

        let id = document.querySelector("#inputId").value;
        let pwd = document.querySelector("#password").value;
        //로그인창에 입력정보 아이디와 비번을 직렬화하여 컨트롤러 sung/login 으로 보낸다
        if (id.trim() !== "" && pwd.trim() !== "") {
            let $loginfrm = $(".loginfrm"); // $loginfrm 변수를 정의

            // serialize() 함수를 jQuery 객체에 직접 적용
            let frmData = $loginfrm.serialize();
            $.ajax({
                url: "/sung/login",
                type:"GET",
                data:frmData,
                success: function(resp){
                    // 받은 정보중에 id, name을
                    //클라이언트 세션에 저장한다.
                    if(resp.message==="false"){
                        alert("아이디, 비번을 확인하세요");
                    }else{
                        location.reload(true);
                    }}
                })  // ajax ends
            }else{
                alert('아이디와 비밀번호를 확인해주세요.')
            }
}}