// 이제 필요한게 qa홈페이지로 되돌릴 링크를 다시 정해야뎀
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
            $('.topContainer').html(temp);
            qaSearch();
        }
    })
}

//----------------qa 부분-------------------------------------

// 질문 작성하기 버튼을 눌렀을때 question 페이지로 이동
export function addQuestion(){
        console.log("123123123123");
        $.ajax({
            url     : "/question",
            type    : "GET",
            success : (resp) => {
                let temp = $(resp).find("#questionId");
                $('.content').html(temp);
            }
        })
    }
//검색하기 findStr 값을 불러오는건 성공함
// export function qaSearch(){
//     let findStr = document.getElementById('findStr').value;
//     $.ajax({
//         url     : "/qa",
//         type    : "POST",
//         data    : {"findStr" : findStr},
//         success : (resp)=>{
//             console.log(findStr);
//         }
//     })
// }
//---------상세보기-------------------- 
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
                $('.content').html(temp);
            }
        })
    })
}



//------------question 부분--------------------------

//질문글 저장
export function qaWrite(){
        let frm = document.frm;
        let frmData = new FormData(frm);
        console.log("질문 남기기")
        // alert(frmData.qusCon);
        $.ajax({
            url: '/questionR',
            type: 'POST',
            data: frmData,
            contentType: false,
            processData: false,
            success: (resp)=>{
                alert('작성이 완료 되었습니다')
                writeToQus();
            }
        }); 
    }

export function writeToQus(){
    $.ajax({
        url     : "/qa",
        type    : "POST",
        success : (resp)=>{
            let temp = $(resp).find(".topContainer");
            $('.content').html(temp);
        }
    })
}

function answerToans(){
    $.ajax({
        url     : "/qaview",
        type    : "POST",
        success : (resp)=>{
            let temp = $(resp).find(".content");
            $('.content').html(temp);
        }
    })
}

export function qusBack(){
        $.ajax({
            url     : "/qa",
            type    : "POST",
            success : (resp)=>{
               let yn = confirm("질문작성을 취소 하시겠습니까?");
            if(!yn) return;
                let temp = $(resp).find(".topContainer");
                $('.content').html(temp);
            }
        })
    }


//-------------answer 부분---------------------------------
export function ansWrite1(){
        let frm = document.csyBoardFrmComment;
        let frmData = $(frm).serialize();
        console.log(frmData);
        let yn = confirm("답변을 작성하시겠습니까?")
        if(!yn) return;
        $.ajax({
            url : "/answerR",
            type : "POST",
            data : frmData,
            success : (resp)=>{
                alert("답변이 작성되었습니다.");
                let params = new URLSearchParams(frmData);
                let qusNum = params.get('qusNum');

                $.ajax({
                    url :  "/qaview",
                    type : "GET",
                    data : {"qusNum" : qusNum},
                    success : (updatedHtml) =>{
                        $('.qaview-container').replaceWith(updatedHtml);
                    }
                })
            }
        })
    }

export function delQa(qusNum){    
        let yn = confirm("삭제 하시겠습니까?");
        if(!yn) return;
        $.ajax({
            url : "/qaDeleteR",
            type: "GET" ,
            data:{"qusNum" :  qusNum},
            success : (resp)=>{
                alert("삭제 되었습니다.");
                writeToQus();
            }
        })
    }  

export function goQusModify(qusNum){
    console.log("수정하러가자");
    console.log(qusNum);
    $.ajax({
        url     : "/qusModify",
        type    : "GET",
        data    : {"qusNum" : qusNum},
        success : (resp) => {
            let temp = $(resp).find("#qusModifyId");
            $('.qaview-container').html(temp);
        }
    })
}

export function qusModify(){
    let frm = document.qusfrm;
    let frmData = $(frm).serialize();
    console.log(frmData);
    let yn = confirm('수정하시겠습니까?');
    if(!yn) return;
    $.ajax({
        url     : "/qusModifyR",
        type    : "POST",
        data    : frmData,
        success : (resp) =>{
            alert("수정이 완료되었습니다.");
            afterModifyQus();
        }
    })
}

export function qusModifyCancel(){
    let yn = confirm("수정을 취소하시겠습니까?");
        if(!yn) return;
    $.ajax({
        url     : "/qusModifyR",
        type    : "POST",
        success : (resp) =>{
            afterModifyQus();
        }
    })
}

function afterModifyQus(){
    let frm = document.qusfrm;
    let frmData = $(frm).serialize();
    $.ajax({
        url     : "/qaview",
        type    : "GET",
        data    : frmData,
                  
        success : (resp)=>{
            let temp = $(resp).find(".qaview-container");
            $('.content').html(temp);
        }
    })
}

function afterDelAns(){
    let frm = document.qusfrm;
    let frmData = $(frm).serialize();
    $.ajax({
        url     : "/qaview",
        type    : "GET",
        data    : frmData,           
        success : (resp)=>{
            let temp = $(resp).find(".qaview-container");
            $('.qaview-container').html(temp);
        }
    })
}

export function ansModify(ansId){
    console.log(ansId);
    $.ajax({
        url : "/ansModifyR",
        type : "GET",
        data : {"ansId" : ansId},
        success : (resp) =>{ 
           console.log(ansId);
            qa("");
        }
    })
}

export function delAns(){
    let yn = confirm("답변을 삭제 하시겠습니까?");
    if(!yn) return;
    console.log("123123")
    let frm = $('#ansContain');
    let frmData = $(frm).serialize();
    console.log(frmData);
    $.ajax({
        url    : "/ansModifyR",
        type   : "GET",
        data   : frmData,
        success : (resp)=>{
            console.log(frmData);
            alert("답변이 삭제되었습니다.");
            writeToQus();
        }
    })
}
 



// $.ajax({
//     url : "/qaview",
//     type : "GET",
//     data : qusNum
// })