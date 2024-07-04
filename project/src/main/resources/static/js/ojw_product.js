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
product();
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

let product_registerR=()=>{
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

let fileChange = (tag)=>{
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

        //첫번째 파일을 대표이미지로 설정
        if(!mainImage.src){
            mainImage.src = URL.createObjectURL(f);
        }else{
            //나머지 파일을 product_sub 클래스를 가진 이미지 요소에 설정
            for (let i=0; i<subImages.lenght;i++){
                if(!subImages[i].src){
                    subImages[i].src=URL.createObjectURL(f);
                    break;
                }
            }
        }
    }
}

let repreImage="";

let product_view = (productCode)=>{
    $.ajax({
        url : "/product_view",
        type : "GET",
        data : {"productCode" : productCode},
        success : (resp)=>{
            let temp = $(resp).find(".product_view");
            $(".product").html(temp);
            viewEvent(productCode);
        }
    })
}