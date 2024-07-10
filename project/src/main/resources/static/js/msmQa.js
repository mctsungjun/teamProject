//qa 페이지로 되돌리기
function qa(){
    $.ajax({
        url     : "/qa",
        type    : "GET",
        success : (resp) =>{
            let temp = $(resp).find(".topContainer");
            $(".topContainer").html(temp);
        }
    })
}
function alert(){
    if(!confirm("그만 두시겠습니까?")){
        
    }else{
        window.location.href="/qa";
    }
}
//----------------qa 부분-------------------------------------

// 질문 작성하기 버튼을 눌렀을때 question 페이지로 이동
function addQuestion(){
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
//---------상세보기-------------------- 근데 onclick이 들어가서 
function qaView(qusNum){
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
function qaBack(){
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
    qaBack.addEventListener('click', ()=>{
        console.log("!23123");
        window.location.href="/qa";
    })
}

//------------question 부분--------------------------

//질문글 저장
function qaWrite(){
    let btnQaWrite = document.querySelector('.qaWrite');
    let btnQaCancel = document.querySelector('.qaCancel');

    btnQaWrite.addEventListener('click', ()=> {
        let frm = document.frm;
        let frmData = new FormData(frm);
        console.log("!@31231223123")   
        $.ajax({
            url: '/questionR',
            type: 'POST',
            data: frmData,
            contentType: false,
            processData: false,
            success: (resp)=>{
                //작성이 완료되면 qa의 메인페이지로 이동
                alert('작성이 완료 되었습니다');
                window.location.href="/qa";
            }
        });
    });
}
function qusBack(){
    let btnQaCancel = document.querySelector(".qaCancel");
        btnQaCancel.addEventListener('click', () => {
        console.log("goqa")
        window.location.href="/qa";
    })
}

//-------------answer 부분---------------------------------

//답변글 저장
function ansWrite(){
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
                //작성이 완료되면 qa의 메인페이지로 이동
                alert('답변 작성이 완료 되었습니다');
            }
        });
    });
}














function backMain(){
    let btnBack = document.querySelector('.qaback');
    btnBack.addEventListener('click', function(){
    window.localStorage.href="/qa.html"
    }
)};
