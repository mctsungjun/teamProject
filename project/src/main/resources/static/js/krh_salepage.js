function salepage(){
    let findStr="";
    if(sessionStorage.getItem("findStr")!=null){ //null이 아닌 경우에만 실행됨
        findStr = sessionStorage.getItem("findStr");
    }
    $.ajax({
        url:"/salepage",
        type:"GET",
        succes:(resp)=>{
            let temp=$(resp).find(".salepage")
            $(".salepage").html(temp);
            salepage_search();
            salepage_sort();
        }
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
            url:"/salepage",
            type:'GET',
            data:{"findStr":findStr},
            success:(resp)=>{
                console.log(resp);
                let temp=$(resp).find(".salepagelist")
                $(".salepagelist").html(temp);
            }
        })
    })
}
salepage_search();

function salepage_sort(){
    let btnCheap=document.querySelector(".btnCheap");
    let btnEx=document.querySelector(".btnEx");
    let btnNew=document.querySelector(".btnNew");

    btnCheap.addEventListener('click',()=>{
        console.log("Qbd");
        $.ajax({
            url:"/salepage_cheap",
            type:'GET',
            success:(resp)=>{
                console.log(resp);
                let temp=$(resp).find(".salepage")
                $(".salepage").html(temp);
            }
        })
    })
    btnNew.addEventListener('click',()=>{
        $.ajax({
            url:"/salepage_new",
            type:'GET',
            success:(resp)=>{
                let temp=$(resp).find(".salepage")
                $(".salepage").html(temp);
            }
        })
    })
    btnEx.addEventListener('click',()=>{
        $.ajax({
            url:"/salepage_ex",
            type:'GET',
            success:(resp)=>{
                let temp=$(resp).find(".salepage")
                $(".salepage").html(temp);
            }
        })
    })
}
salepage_sort();