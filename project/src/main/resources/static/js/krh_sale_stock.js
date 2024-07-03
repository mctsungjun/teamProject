//검색 기능
function sale(){
    let findStr="";
    if(sessionStorage.getItem("findStr")!=null){ //null이 아닌 경우에만 실행됨
        findStr = sessionStorage.getItem("findStr");
    }
    $.ajax({
        url:"/sale",
        type:"GET",
        success:(resp)=>{
            let temp=$(resp).find(".big");
            $('.big').html(temp);
            search();
        }
    })

}
function sale_list(sno) {
    $.ajax({
        url: "/sale_list",
        type: 'get', // 올바른 HTTP 메소드로 설정
        data: { "sno": sno },
        success: function(resp) {
            let temp=$(resp).find(".salelist");
            $('.big').html(temp); // 받은 HTML을 .big 클래스를 가진 요소에 삽입
            salelistevent(sno);
        }
    })
}

function salelistevent(sno){
    let btnList=document.querySelector(".btnList");
    btnList.addEventListener('click',()=>{
        sale();
    })
}

function search(){
    let btnSearch=document.querySelector(".btnSearch");
    let findStr=sessionStorage.getItem(".findStr")
    if(findStr!=null){
        $(".findStr").val(findStr);
    }           
    btnSearch.addEventListener('click',()=>{
        findStr = $(".findStr").val();
        sessionStorage.setItem("findStr",findStr);                
        
        $.ajax({
            url:'/sale',
            type:'GET',
            data:{"findStr":findStr},
            success:(resp)=>{
                let temp=$(resp).find(".items");
                $(".items").html(temp);
            }
        });
   })    
}
search();

function sale_view(sno){
    $.ajax({
        url:"/sale_view",
        type:"GET",
        data:{"sno":sno},
        success:(resp)=>{
            console.log(resp);
            let temp=$(resp).find(".saleview");
            $('.big').html(temp);
            ViewEvent(sno);
        }
    })
}

function ViewEvent(sno){
    let btnModify=document.querySelector(".btnModify");
    let btnDelete=document.querySelector(".btnDelete");
    let btnList=document.querySelector(".btnList");

    btnModify.addEventListener('click',()=>{
        $.ajax({
            url:"/sale_view_modify",
            type:"GET",
            data:{"sno":sno},
            success:(resp)=>{
                let temp=$(resp).find(".saleviewmodify");
                $('.big').html(temp);
                sale_view_modify(sno);
            }
        })
    })

    btnDelete.addEventListener('click',()=>{
        let yn=confirm("판매 내역을 삭제하시겠습니까?");
        if(!yn) return;
    })

    btnList.addEventListener('click',()=>{
        sale(sno);
    })
}

let sale_view_modify=(sno)=>{
    btnModifyR=document.querySelector(".btnModifyR");
    btnList=document.querySelector(".btnList");

    btnList.addEventListener('click',()=>{
        sale_view(sno);
    })

    btnModifyR.addEventListener('click',()=>{

        let frm=document.viewfrm;
        let frmData=new FormData(frm);

        $.ajax({
            url:"/sale_view_modifyR",
            type:"POST",
            contentType:false,
            processData:false,
            data:frmData,
            success:(resp)=>{
                console.log(resp);
                sale();
            }
        })
    })
}

//salepage.html 검색
function salepage_search(){
    let btnSearch=document.querySelector(".btnSearch");
    let findStr=sessionStorage.getItem(".findStr");
    if(findStr!=null){
        $(".findStr").val(findStr);
    }
    btnSearch.addEventListener('click',()=>{
        findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);

        $.ajax({
            url:"/salepage_search",
            type:'GET',
            data:{"findStr":findStr},
            success:(resp)=>{
                let temp=$(resp).fine(".salepageproduct")
                $(".salepageproduct").html(temp);
            }
        })
    })
}