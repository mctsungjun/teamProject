document.querySelector(".btnAdd").onclick = () => {
    $.ajax({
        url: "/question",
        type: "GET",
        success: (resp) => {
            console.log("123123")
            let temp = $(resp).find("#questionId");
            $(".content").html(temp);
        }
    });
}