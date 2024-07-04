let nowPage = 1;
//페이징 처리
function salepage(){
    let findStr="";
    $.ajax({
        url:"/salepage",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:(resp)=>{
            let temp=$(resp).find(".salepage")
            $(".salepage").html(temp);
            console.log(temp);
            salepagesearch();
            loadItem(findStr,nowPage);
        }
    })
}
salepage();
export function salepagesearch(){
    let btnSearch = document.querySelector(".btnSearch");
    btnSearch.addEventListener('click',()=>{
        let findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);
        loadItem(findStr,nowPage);
    })

    const salepage_view=(productCode)=>{
        $.ajax({
            url:"/salepage_view",
            type:"GET",
            data:{"productCode":productCode},
            success:(resp)=>{
                console.log(resp);
                let temp=$(resp).find(".salepage_view")
                $(".salepage").html(temp);
            }
        })
    }
    return {salepage_view}

}


function loadItem(findStr,nowPage){
    console.log("loadItem.....", findStr, nowPage)
    $.ajax({
        url:"/salepage",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:(resp)=>{
            let temp=$(resp).find(".salepagelist");
            $(".salepagelist").html(temp);
            sessionStorage.setItem("saleNowPage",nowPage);
            $(".btnPrevEnable").on("click",()=>{
                console.log("prev...");
                let findStr=$(".findStr").val();
                if(sessionStorage.getItem("saleNowPage")!=null){
                    nowPage=sessionStorage.getItem("saleNowPage");
                    if(nowPage>1) nowPage--;
                }
                loadItem(findStr,nowPage);
            })
            $(".btnNextEnable").on("click", ()=>{
                console.log("next...")
                console.log(nowPage);
                let findStr = $(".findStr").val();
                if(sessionStorage.getItem("saleNowPage") != null){
                    nowPage = sessionStorage.getItem("saleNowPage");
                    nowPage++;               
                }
                loadItem(findStr, nowPage);
            })
        }
    })
}