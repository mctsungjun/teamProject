function purchase(){
    let findStr="";
    if(sessionStorage.getItem("findStr") != null){
        findStr = sessionStorage.getItem("findStr");
    }

    $.ajax({
        url : "/purchase",
        type : "GET",
        success : (resp) =>{
            let temp = $(resp).find(".purchase");
            $('.purchase').html(temp);
            search();
        }
    })
}

function search(){
    let btnSearch = document.querySelector(".btnSearch")
    let findStr = sessionStorage.getItem(".findStr");
    if(findStr != null){
        $(".findStr").val(findStr);
    }
    
    btnSearch.addEventListener("click",()=>{
        findStr = $('.findStr').val();
        sessionStorage.setItem("findStr",findStr);

        console.log("버튼")
        
        $.ajax({
            url : '/purchase',
            type : "GET",
            data : {"findStr" : findStr},
            success : (resp)=>{
                let temp = $(resp).find(".items");
                $(".items").html(temp);
            }
        })
    })
}
search();

function purchase_view(no){
    $.ajax({
        url : "/purchase_view",
        type : "GET",
        data : {"no" : no},
        success:(resp)=>{
            console.log(resp);
            let temp=$(resp).find(".purchase_view");
            $('.purchase').html(temp);

        }
    })
}

function purchase_list(no){
    $.ajax({
        url : "/purchase_list",
        type : "GET",
        data : {"no":no},
        success:(resp)=>{
            let temp=$(resp).find(".purchase_list");
            $('.main').html(temp);
        }
    })
}


/*
function viewEvent(no){
    let btnModify = document.querySelector(".btnModify");
    let btnDelete = document.querySelector(".btnDelete");
    let btnList = document.querySelector(".btnList");

    btnModify.addEventListener("click",()=>{
        let yn=confirm("수정하시겠습니까?");
        if(!yn) return;

        $.ajax({
            url : "/purchase_update",
            type : "GET",
            data : {"no" : no},
            success : (resp)=>{
                let temp = $(resp).find(".update")
                $(".")
            }
        })
    })
}
*/