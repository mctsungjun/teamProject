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
            $('.content').html(temp);
            purchase_search();
        }
    })
}
// purchase();
function purchase_search(){
    let btnSearch = document.querySelector(".btnSearch");
    let btnRegister = document.querySelector(".btnRegister");
    let findStr = sessionStorage.getItem(".findStr");
    if(findStr != null){
        $(".findStr").val(findStr);
    }
    
    btnSearch.addEventListener("click",()=>{
        findStr = $('.findStr').val();
        sessionStorage.setItem("findStr",findStr);

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
    btnRegister.addEventListener("click",()=>{
        $.ajax({
            url : "/purchase_register",
            type : "GET",
            success : (resp)=>{
                let temp = $(resp).find('.purchase_register');
                $('.content').html(temp);
                purchase_register();
            }
        })
    })
}

function purchase_register(){
    let btnRegisterR=document.querySelector(".btnRegisterR");
    let btnList=document.querySelector(".btnList");

    btnRegisterR.addEventListener("click",()=>{
        let frm = document.frm;
        let frmData = new FormData(frm);

        $.ajax({
            url : "/purchase_registerR",
            type : "POST",
            data : frmData,
            contentType : false,
            processData : false,
            success : (resp)=>{
                purchase();
            }
        })
    })
    btnList.addEventListener("click",()=>{
        purchase();
    })
}

let purchase_view=(no)=>{
    $.ajax({
        url : "/purchase_view",
        type : "GET",
        data : {"no" : no},
        success:(resp)=>{
            let temp=$(resp).find(".purchase_view");
            $('.content').html(temp);
            purchaseViewEvent(no);
        }
    })
    
}

function purchase_list(no){
    $.ajax({
        url : "/purchase_list",
        type : "GET",
        data : {"no":no},
        success:(resp)=>{
            console.log(resp);
            let temp=$(resp).find(".purchase_list");
            $('.content').html(temp);
            purchaseListEvent(no);
            console.log(temp);
        }
    })
}

function purchaseListEvent(no){
    let btnList = document.querySelector(".btnList");

    btnList.addEventListener('click',()=>{
        purchase();
    })
}


function purchaseViewEvent(no){
    let btnModify = document.querySelector(".btnModify");
    let btnDelete = document.querySelector(".btnDelete");
    let btnList = document.querySelector(".btnList");

    btnModify.addEventListener("click",()=>{
        console.log("구매 수정");
        $.ajax({
            url : "/purchase_modify",
            type : "GET",
            data : {"no" : no},
            success : (resp)=>{
                let temp = $(resp).find(".purchase_modify")
                $(".content").html(temp);
                purchase_modify(no);
            }
        })
    })
    btnList.addEventListener("click",()=>{
        purchase();
    })
    btnDelete.addEventListener("click",()=>{
        let yn = confirm("삭제하시겠습니까?");
        if(!yn) return;

        $.ajax({
            url : "/purchase_deleteR",
            type : "GET",
            data : {"no" : no},
            success : (resp)=>{
                purchase("");
            }
        })
    })
}

let purchase_modify=(no)=>{
    btnModifyR = document.querySelector('.btnModifyR');
    btnList = document.querySelector('.btnList');

    btnList.addEventListener('click',()=>{
        console.log("리스트");
        purchase(no);
    })

    btnModifyR.addEventListener("click",()=>{
        let frm = document.purchasefrm;
        let frmData = new FormData(frm);

        console.log("저장");
        $.ajax({
            url : "/purchase_modifyR", //Controller의 path
            type : "POST",
            contentType : false,
            processData : false,
            data : frmData,
            success : (resp)=>{
                purchase();
            }
        })
    })
}

