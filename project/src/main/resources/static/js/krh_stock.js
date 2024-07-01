function stock(){
    let findStr="";
    if(sessionStorage.getItem("findStr")!=null){
        findStr=sessionStorage.getItem("findStr");
    }
    $.ajax({
        url:"/stock",
        type:"/GET",
        success:(resp)=>{
            let temp=$(resp).find(".stock");
            $(".content").html(temp);
            search();
        }
    })
}

function search(){
    let btnSearch = document.querySelector(".btnSearch");
    if(findStr != null){
        $(".findStr").val(findStr);
    }
    btnSearch.addEventListener('click',()=>{
        findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);

        $.ajax({
            url:"/stock",
            type:'GET',
            data:{"findStr":findStr},
            success:(resp)=>{
                let temp=$(resp).find(".stockitem");
                $(".stockitem").html(temp);
            }
        })
    })
}
search();