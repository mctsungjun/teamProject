$(function(){
    loadMain();
    loadNav();
})

let loadNav = () => {
    $.ajax ({
        url : "/nav",
        type: "GET",
        // data: {"findStr" : findStr},       // * 이거 selected icon 넘겨줘야함
        success: (resp) => {
            let temp = $(resp).find(".nav");  // * nav    : nav.html
            $(".navbar").html(temp);          // * navbar : index.html
        }
    })
}

let loadMain = (findStr) => {
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