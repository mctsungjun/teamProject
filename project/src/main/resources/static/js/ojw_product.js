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
            product_search();
        }
    })
}
function product_search(){
    let btnRegister = document.querySelector(".abcabc");
    let btnSearch = document.querySelector(".btnSearch");
    let findStr=sessionStorage.getItem(".findStr");
    if(findStr != null){
        $(".findStr").val(findStr);
    }

    btnSearch.addEventListener("click",()=>{
        findStr = $('.findStr').val();
        sessionStorage.setItem("findStr",findStr);

        $.ajax({
            url : '/product',
            type : "GET",
            data : {"findStr" : findStr},
            success : (resp)=>{
                let temp = $(resp).find(".product_list");
                $(".product_list").html(temp);
            }
        })
    })

    btnRegister.addEventListener('click',()=>{
        $.ajax({
            url : "/product_register",
            type : "GET",
            success : (resp)=>{
                let temp = $(resp).find('.product_register');
                $('.product').html(temp);
                product_register();
            }
        })
    })
}

function product_register(){
    let btnRegisterR=document.querySelector(".btnRegisterR");
    let btnList=document.querySelector(".btnList");

    btnRegisterR.addEventListener('click',()=>{
        product_registerR();
    })
    btnList.addEventListener('click',()=>{
        product();
    })
}

function product_registerR(){
    let frm = document.frm;
    let frmData = new FormData(frm);

    $.ajax({
        url : "/product_registerR",
        type : "POST",
        data : frmData,
        contentType : false,
        processData : false,
        success : (resp) =>{
            product();
        }
    })
}

function fileChange(tag){
    let repre=document.querySelector('.repre');
    repre.innerHTML = '';
    let legend = document.createElement("legend");
    legend.textContent="대표이미지 선택";
    repre.appendChild(legend);

    for(f of tag.files){
        let chkbox=document.createElement("input");
        let label=document.createElement("label");
        let br=document.createElement("br");

        chkbox.type="radio";
        chkbox.name="photo";
        chkbox.value=f.name;

        label.textContent=f.name;
        label.prepend(chkbox);

        repre.appendChild(label);
        repre.appendChild(br)
    }
}


function product_view(productCode){
    $.ajax({
        url : "/product_view",
        type : "GET",
        data : {"productCode" : productCode},
        success : (resp)=>{
            let temp = $(resp).find(".product_view");
            $(".product").html(temp);
            productViewEvent(productCode);
        }
    })
}

function productViewEvent(productCode){
    let btnModify = document.querySelector(".btnModify");
    let btnDelete = document.querySelector(".btnDelete");
    let btnList = document.querySelector(".btnList");
    let btnChangePhoto = document.querySelector(".btnChangePhoto");

    btnModify.addEventListener("click",()=>{
        console.log("")
        $.ajax({
            url : "/product_modify",
            type : "GET",
            data : {"productCode" : productCode},
            success : (resp)=>{
                let temp = $(resp).find(".product_modify")
                $(".product").html(temp);
                product_modify(productCode);
            }
        })
    })
}

let repreProductImage="";

function product_modify(productCode){
    btnModifyR = document.querySelector('.btnModifyR');
    btnList = document.querySelector('.btnList');

    btnList.addEventListener('click',()=>{
        product();
    })

    btnModifyR.addEventListener("click",()=>{
        $.ajax({
            url : "product_modifyR",
            type : "POST",
            contentType : false,
            processData : false,
            data : frmData,
            success : (resp)=>{
                product();
            }
        })
    })
}

function checkUp(box){
    let p = box.parentNode;
    if(box.checked){
        p.style.textDecoration = "line-through";
        p.style.color = "#f00";
    }else{
        p.style.textDecoration = "none";
        p.style.color = "";
    }
}