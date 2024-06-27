//검색 기능
$(function(){
    sale();
});

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
            $('.main').html(temp);
            search();
        }
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
            $('.main').html(temp);
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
                $('.main').html(temp);
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

let UpdateForm=(sno)=>{
    $.ajax({
        url:"/"
    })
}

function sale_view_modify(sno){
    let btnModifyR=document.querySelector(".btnModifyR");
    let btnList=document.querySelector(".btnList");
    
    btnModifyR.addEventListener('click',()=>{
        let frm=document.viewfrm;
        let frmData=$(frm).serialize();

        $.ajax({
            url:"/sale_view_modify",
            type:"POST",
            data:frmData,
            success:(resp)=>{
                if(resp){
                    alert("수정에 성공하였습니다.");
                }else{
                    alert("수정에 실패하였습니다.");
                }
            }
        })
    })

    btnList.addEventListener('click',()=>{
        sale_view(sno);
    })

}