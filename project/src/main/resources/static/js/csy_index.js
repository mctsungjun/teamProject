$(function(){
    loadAuthPage();
    loadMain();
    loadNav();
})

// let loadLoginPage = () => {
//     $.ajax ({
//         url : "/nav",
//         type: "GET",
//         // data: {"findStr" : findStr},       // * 이거 selected icon 넘겨줘야함
//         success: (resp) => {
//             let temp = $(resp).find("#loginPage");  // * nav    : nav.htm
//             $("#loginPage").html(temp);          // * navbar : index.html
//         }
//     })
// }

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

let loadMain = (findStr) => {
    $.ajax ({
        url : "/design_guide",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find(".designGuide");
            $(".content").html(temp);
        }
    })
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