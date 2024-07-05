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
            salepagesearch();
            loadItem(findStr,nowPage);
        }
    })
}
salepage();

export function salepagesearch(){
    let btnSearch = document.querySelector(".btnSearch");
    let findStr="";
    loadItem(findStr,nowPage);
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
                $(".salepagelist").html(temp);
                getnumber();
                gumae();
            }
        })
    }
    return {salepage_view}
}
salepagesearch();

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

function getnumber(){
    document.getElementById('getNumberButton').onclick = function() {
        console.log("바보");
        var inputElement = document.getElementById('quantity');
        var inputValue = inputElement.value;
        var numberValue = parseFloat(inputValue);
        var voPrice = parseFloat(document.getElementById('voPrice').textContent);
        if (!isNaN(numberValue)) {
            var totalPrice = numberValue * voPrice;
            document.getElementById('pricecolor').textContent = totalPrice;
        } else {
            document.getElementById('pricecolor').textContent = "유효한 숫자를 입력하세요.";
        }
    };
}

function gumae(){
    const sessionId=/*[[${session.getId()}]]*/'';

    document.getElementById('submitFormButton').addEventListener('click', function() {
        console.log("바보");
        var formData = new FormData(document.getElementById('gumaeForm'));
        forData.append('sessionId',sessionId);
        
        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('상품이 성공적으로 등록되었습니다.');
            } else {
                alert('상품 등록에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('오류가 발생했습니다.');
        });
    });
}