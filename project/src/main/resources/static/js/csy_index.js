$(function(){
    loadAuthPage();
    loadMain();
    loadNav();
})

let loadNav = () => {
    $.ajax ({
        url : "/nav",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find(".nav");  // * nav    : nav.html
            $(".navbar").html(temp);          // * navbar : index.html
        }
    })
}

// * 본인 페이지 메인에 보고 싶으시면 이 부분 수정
// * GIT에는 업로드 X
let loadMain = (findStr) => {
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
    // $.ajax ({
    //     url : "/design_guide",
    //     type: "GET",
    //     success: (resp) => {
    //         let temp = $(resp).find(".designGuide");
    //         $(".content").html(temp);
    //     }
    // })
}

let loadAuthPage = () => {
    $.ajax({
        url:"/login",
        type:"GET",
        success:(resp)=>{
            let temp = $(resp).find(".loginPage");
            $(".authPage").html(temp);
        }
    })
}