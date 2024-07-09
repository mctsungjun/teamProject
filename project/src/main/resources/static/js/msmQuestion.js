//------------------question 페이지---------------------

// 메인페이지로 가는 버튼이지만 고객센터 페이지로 이동

document.querySelector(".qaCancel").onclick = () => {
    $.ajax({
        url : "/qa",
        type: "GET",
        success: (resp) => {
            console.log("index")
            let temp = $(resp).find("#qaBoard");
            $("#questionId").html(temp)
        }
    });
}
