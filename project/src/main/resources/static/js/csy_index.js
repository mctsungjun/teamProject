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
<<<<<<< HEAD
        url:"/salepage",
        type:"GET",
        success:(resp)=>{
            let temp=$(resp).find(".salepage")
            $(".content").html(temp);
            // salepage();
=======
        url : "/product",
        type : "GET",
        success : (resp)=>{
            let temp = $(resp).find(".product");
            $('.content').html(temp);
            product_search();
>>>>>>> 4d1310604a8277e5a5c27d59c43dce89eaed9b25
        }
    })

    // $.ajax({
    //     url:"/salepage",
    //     type:"GET",
    //     success:(resp)=>{
    //         let temp=$(resp).find(".salepage")
    //         $(".content").html(temp);
    //         // salepage();
    //     }
    // });
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