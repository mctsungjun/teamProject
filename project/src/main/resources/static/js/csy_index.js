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

let loadMain = (findStr) => {
    $.ajax({
		url:"/sung/detail",
		type:"GET",
		success:(resp)=>{
			let temp = $(resp).find(".myProfilePage");
			$(".content").html(temp);
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