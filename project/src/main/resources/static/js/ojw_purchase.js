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
            purchase_search();
        }
    })
}
purchase();
function purchase_search(){
    let btnSearch = document.querySelector(".btnSearch")
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
}
purchase_search();

function purchase_view(no){
    $.ajax({
        url : "/purchase_view",
        type : "GET",
        data : {"no" : no},
        success:(resp)=>{
            let temp=$(resp).find(".purchase_view");
            $('.purchase').html(temp);
<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
            purchaseViewEvent(no);
=======
            viewEvent(no);
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
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
            $('.purchase').html(temp);
<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
            purchaseListEvent(no);
=======
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
        }
    })
}

function purchaseListEvent(no){
    let btnList = document.querySelector(".btnList");

<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
    btnList.addEventListener('click',()=>{
        purchase();
    })
}


function purchaseViewEvent(no){
=======

function viewEvent(no){
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
    let btnModify = document.querySelector(".btnModify");
    let btnDelete = document.querySelector(".btnDelete");
    let btnList = document.querySelector(".btnList");

    btnModify.addEventListener("click",()=>{

        $.ajax({
            url : "/purchase_modify",
            type : "GET",
            data : {"no" : no},
            success : (resp)=>{
                let temp = $(resp).find(".purchase_modify")
                $(".purchase").html(temp);
                purchase_modify(no);
            }
        })
    })
    btnList.addEventListener('click',()=>{
        purchase();
    })
}

<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
function purchase_modify(no){
=======
let purchase_modify=(no)=>{
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
    btnModifyR = document.querySelector('.btnModifyR');
    btnList = document.querySelector('.btnList');

    btnList.addEventListener('click',()=>{
<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
        purchase();
=======
        purchase_list();
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
    })

    btnModifyR.addEventListener("click",()=>{
        let frm = document.purchasefrm;

        let frmData = new FormData(frm);
        $.ajax({
<<<<<<< HEAD:project/src/main/resources/static/js/ojw_purchase.js
            url : "/purchase_modifyR", //Controller의 path
=======
            url : "/purchase_modifyR", //Controll의 path
>>>>>>> 7e5772ac77e19d2e714291a29aaa9f18f01d40ac:project/src/main/resources/static/js/ojw_index.js
            type : "POST",
            contentType : false,
            processData : false,
            data : frmData,
            success : (resp)=>{
                console.log(resp)
                purchase();
            }
        })
    })
    btnList.addEventListener('click',()=>{
        purchase_view();
    })
}

