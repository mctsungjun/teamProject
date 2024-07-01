function product(){
    let findStr="";
    if(sessionStorage.getItem("findStr") != null){
        findStr = sessionStorage.getItem("findStr");
    }

    $.ajax({
        url : "/product",
        type : "GET",
        success : (resp)=>{
            let temp = $(resp).find(".product");
            $('.product').html(temp);
            search();
        }
    })
}

function product_search(){
    let btnRegister = document.querySelector(".btnRegister");
    let btnSearch = document.querySelector(".btnSearch");
    if(findStr != null){
        $(".findStr").val(findStr)
    }

    btnSearch.addEventListener("click",()=>{
        findStr = $('.findStr').val();
        sessionStorage.setItem("findStr",findStr);

        $.ajax({
            url : '/product',
            type : "GET",
            data : {"findStr" : findStr},
            success : (resp)=>{
                let temp = $(resp).find(".product_ul");
                $(".product_ul").html(temp);
            }
        })
    })
}
search();