//-------------qa 페이지------------------------
document.querySelector(".btnAdd").onclick = () => {
    $.ajax({
        url: "/question",
        type: "GET",
        success: (resp) => {
            console.log("123123")
            let temp = $(resp).find("#questionId");
            $("#qaBoard").html(temp);
        }
    });
}


//-----------------상세보기

document.querySelector(".btnMain").onclick = () => {
    $.ajax({
        url: "/qaview",
        type: "GET",    
        success: (resp) => {
            console.log("123123")
            let temp = $(resp).find(".qaview-container");
            $("#qaBoard").html(temp);
        }
    });
}
/* 메인페이지로 가는 버튼
document.querySelector(".btnMain").onclick = () => {
    $.ajax({
        url     : "/",
        type: "GET",
        success: (resp) => {
            console.log("12312314")
            let temp = $(resp).find(".content");
            $("#qaBoard").html(temp)
        }
    })
}
*/

