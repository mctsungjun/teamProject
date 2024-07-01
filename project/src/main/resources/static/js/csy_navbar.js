// * 임시 홈, 디자인 가이드: 공지 넣을까 싶음
document.querySelector("#navBtnToDesignGuide").onclick = () => {
    $.ajax ({
        url : "/design_guide",
        type: "GET",
        // data: {"findStr" : findStr},               // * 이거 selected icon 넘겨줘야함
        success: (resp) => {
            let temp = $(resp).find(".designGuide");  // * nav    : nav.html
            $(".content").html(temp);                 // * navbar : index.html
        }
    })
}

// * 제품관리 + 재고 정보 관리
document.querySelector("#navBtnToProduct").onclick = () => { }

// * 제품관리 + 재고 정보 관리
document.querySelector("#navBtnToStock").onclick = () => { }

// * 구매정보관리
document.querySelector("#navBtnToBuyInfo").onclick = () => { }

// * 판매정보관리
document.querySelector("#navBtnToSellInfo").onclick = () => { }

// * 거래처 관리
document.querySelector("#navBtnToPartners").onclick = () => { }

// * 게시판 + 공지사항을 여기 넣을까?
document.querySelector("#navBtnToBoard").onclick = () => {
    $.ajax ({
        url : "/board",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find("#board");
            $(".content").html(temp);
        }
    })
}

// * ADMIN 페이지, 회원 관리
document.querySelector("#navBtnToAdmin").onclick = () => { }

// * 고객센터: Q & A
document.querySelector("#navBtnToCS").onclick = () => { }

// * 프로필 관리
//document.querySelector("#navBtnToProfileEdit").onclick = () => { }

// * 프로필 관리
document.querySelector("#navBtnToLogout").onclick = () => { 
    // sung
        $.ajax({
            url:"/sung/logout",
            type:"GET",
            success:(resp)=>{
                //alert("로그아웃되었음")
                
               
                $.ajax ({
                    url : "/login",
                    type: "GET",
                    success: (resp) => {
                        let temp = $(resp).find(".change");  
                        $(".content").html(temp);                
                    }
                })
            }
        })             
       
}