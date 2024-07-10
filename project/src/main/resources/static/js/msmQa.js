// * 예시: 
// function 123(){
//     let qaBack = document.querySelector(".qaBack");
//     qaBack.addEventListener('click', ()=>{
//         $.ajax({
//             url     : "/qa",
//             type    : "GET",
//             success : (resp)=>{
//                 let temp = $(resp).find(".topContainer");
//                 $('.qaview-container').html(temp);
//             }
//         })
//     })
// }

// export function 123(){
//     $.ajax({
//         url     : "/qa",
//         type    : "GET",
//         success : (resp)=>{
//             let temp = $(resp).find(".topContainer");
//             $('.qaview-container').html(temp);
//         }
//     })
// }



//qa 페이지로 되돌리기
export function qa(){
    let findStr="";
    if(sessionStorage.getItem("findStr") != null){
        findStr = sessionStorage.getItem("findStr");
    }

    $.ajax({
        url     : "/qa",
        type    : "GET",
        success : (resp) =>{
            let temp = $(resp).find(".topContainer");
            $(".topContainer").html(temp);
            qaSearch();
        }
    })
}
//----------------qa 부분-------------------------------------

// 질문 작성하기 버튼을 눌렀을때 question 페이지로 이동
export function addQuestion(){
    let addQa = document.querySelector(".addQuestion");
    addQa.addEventListener('click', ()=>{
        console.log("123123123123");
        $.ajax({
            url     : "/question",
            type    : "GET",
            success : (resp) => {
                let temp = $(resp).find("#questionId");
                $(".topContainer").html(temp);
            }
        })
    })
}
//검색하기
export function qaSearch(){
    let btnSearch = document.querySelector(".btnSearch")
    //(".findStr") -> findStr
    let findStr = sessionStorage.getItem("findStr");
    if(findStr != null){
    //$(.findStr) -> $('#search'), val(findStr) -> val();
        $('#search').val();
    //sessionStorage.setItem("findStr", findStr); 추가
        sessionStorage.setItem("findStr", findStr);
    }
    btnSearch.addEventListener("click",()=>{
        findStr = $('.search').val();
        sessionStorage.setItem("findStr",findStr);
        $.ajax({
            url : '/qa',
            type : "GET",
            data : {"findStr" : findStr},
            success : (resp)=>{
                let temp = $(resp).find(".topContainer");
                $(".topContainer").html(temp);
            }
        });
    });
}
    //07.10추가
    $(document).ready(() => {
        qaSearch();
});

//---------상세보기-------------------- 근데 onclick이 들어가서 
export function qaView(qusNum){
    console.log("!23123")
    $.ajax({
        url     : "/qaview",
        type    : "GET",
        data    : {"qusNum" : qusNum},
        success : (resp)=>{
            let temp = $(resp).find(".qaview-container");
            $('.topContainer').html(temp);
        }
    })
}


//------------qaview 부분---------------------------

//답변 작성하기 버튼을 눌렀을때 answer페이지로 이동
export function qaGo(){
    let qaGo = document.querySelector(".goAns");
    //if (qaGo.disabled) return; // 버튼이 비활성화된 경우 함수 실행 중지
    let qaBack = document.querySelector(".qaBack");
    qaGo.addEventListener('click', ()=>{
        console.log("123123123123");
        $.ajax({
            url     : "/qaview",
            type    : "GET",
            success : (resp)=> {
                window.location.href="/answer";
            }
        })
    })
}

export function qaBack(){
    let qaBack = document.querySelector(".qaBack");
    qaBack.addEventListener('click', ()=>{
        $.ajax({
            url     : "/qa",
            type    : "GET",
            success : (resp)=>{
                let temp = $(resp).find(".topContainer");
                $('.qaview-container').html(temp);
            }
        })
    })
}



//------------question 부분--------------------------

//질문글 저장
export function qaWrite(){
    let btnQaWrite = document.querySelector('.qaWrite');
    let btnQaCancel = document.querySelector('.qaCancel');

    btnQaWrite.addEventListener('click', ()=> {
        let frm = document.frm;
        let frmData = new FormData(frm);
        console.log("질문 남기기")   
        $.ajax({
            url: '/questionR',
            type: 'POST',
            data: frmData,
            contentType: false,
            processData: false,
            success: (resp)=>{
                //작성이 완료되면 qa의 메인페이지로 이동
                alert('작성이 완료 되었습니다');
            }
        });
    });
}
export function qusBack(){
    let btnQaCancel = document.querySelector(".qaCancel");
        btnQaCancel.addEventListener('click', () => {
            $.ajax({
                url     : "/qa",
                type    : "POST",
                success : (resp)=>{
                    let temp = $(resp).find(".topContainer");
                    $('#questionId').html(temp);
                }
            })
    })
}

//-------------answer 부분---------------------------------

//답변글 저장
/*
export function ansWrite(){
    let btnQaWrite = document.querySelector('.ansWrite');
    let btnAnsCancel = document.querySelector('.ansCancel');

    btnQaWrite.addEventListener('click', ()=> {
        let frm = document.frm;
        let frmData = new FormData(frm);
            
        $.ajax({
            url: '/answerR',
            type: 'POST',
            data: frmData,
            contentType: false,
            processData: false,
            success: (resp)=>{
                //작성이 완료되면 qa의 메인페이지로 이동 은 일단 제외
                alert('답변 작성이 완료 되었습니다');
            }
        });
    });
} */
export function ansWrite(qusNum){
    btnAnsWrite = document.querySelector('.ansWrite');
    btnAnsCancel = document.querySelector('.ansCancel');

    btnAnsCancel.addEventListener('click',()=>{
        qa();
    })

    btnAnsWrite.addEventListener("click",()=>{
        let frm = document.answerfrm;
        let frmData = new FormData(frm);

        $.ajax({
            url : "/answerR",
            type : "POST",
            contentType : false,
            processData : false,
            data : frmData,
            success : (resp)=>{
                qa();
            }
        })
    })
}











/* 이거 왜있는지 모르겠음
export function backMain(){
    let btnBack = document.querySelector('.qaback');
    btnBack.addEventListener('click', function(){
    window.localStorage.href="/qa.html"
    }
)};
*/