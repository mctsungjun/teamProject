// * 임시 홈, 디자인 가이드: 공지 넣을까 싶음
document.querySelector("#navBtnToDesignGuide").onclick = () => {
    $.ajax ({
        url : "/design_guide",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find(".designGuide");  // * nav    : nav.html
            $(".content").html(temp);                 // * navbar : index.html
        }
    })
}

// * 제품관리 + 재고 정보 관리
document.querySelector("#navBtnToStock").onclick = async () => {
    let obj = await import ("/js/krh_stock.js");
    obj.stock();
    $.ajax({
        url:"/stock",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:async (resp)=>{
            let temp=$(resp).find(".stockpage");
            $(".content").html(temp);
        }
    })
}

// * 제품 관리
document.querySelector("#navBtnToProduct").onclick = () => { 
    $.ajax({
        url : "/product",
        type : "GET",
        success : (resp)=>{
            let temp = $(resp).find(".product");
            $('.content').html(temp);
            product_search();
        }
    })
}



// * 구매 정보 관리
document.querySelector("#navBtnToBuyInfo").onclick = () => { 
    $.ajax({
        url : "/purchase",
        type : "GET",
        success : (resp) =>{
            let temp = $(resp).find(".purchase");
            $('.content').html(temp);
            purchase_search();
        }
    })
}

// * 판매 정보 관리
document.querySelector("#navBtnToSellInfo").onclick = () => {
    $.ajax({
        url:"/sale",
        type:"GET",
        success:(resp)=>{
            let temp=$(resp).find(".big");
            $('.content').html(temp);
            search();
        }
    })
}

// * 쇼핑몰
document.querySelector("#navBtnToShopping").onclick = () => {
    $.ajax({
        url:"/salepage",
        type:"GET",
        success:(resp)=>{
            let temp=$(resp).find(".salepage")
            $(".content").html(temp);
            salepage();
        }
    })
}

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
document.querySelector("#navBtnToAdmin").onclick = () => { 
    $.ajax({
        url:"/sung/list",
        type:"GET",
        data:{"code": 'a001'},
        success:(resp)=>{
            let temp = $(resp).find(".adminPage");
            $(".content").html(temp);
        }
    })
}

// * 고객센터: Q & A
document.querySelector("#navBtnToCS").onclick = () => {
    $.ajax({
        url: "/qa",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find(".topContainer");
            $(".content").html(temp);
        }
    });
}

// * 프로필 관리
document.querySelector("#navBtnToProfileEdit").onclick = () => {
    $.ajax({
        url:"/sung/detail",
        type:"GET",
        success:(resp)=>{
            let temp = $(resp).find(".myProfilePage");
            $(".content").html(temp);
            $.ajax({
                url: "/sung/detail_main",
                type: "GET",
                success:(resp) => {
                    let temp = $(resp).find(".myprofile-main");
                    $(".myprofile-detail-content").html(temp);
                }
            })
        }
    })
}

// * 로그아웃
document.querySelector("#navBtnToLogout").onclick = () => {
    // sung
        $.ajax({
            url:"/sung/logout",
            type:"GET",
            success:(resp)=>{
                location.reload(true);
            }
        })
    }

// * 공지사항
document.querySelector("#navBtnToAnnouncement").onclick = () => {
    $.ajax({
        url : "/bjmNoticeList",
        type : "GET",
        data : {"nowPage": 1, "findStr": ""},
        success : (resp) => {
            let temp = $(resp).find(".noticeList");
            $(".content").html((temp))
            console.log(temp)
        }
    })
}