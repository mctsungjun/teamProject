//----------------qa 부분-------------------------------------
function goAdd(){
let goAdd = document.querySelector('.btnAdd');
    goAdd.addEventListener('click', function(){
    $.ajax({
        url: "/question",
        type: "GET",
        success: (resp) => {
            console.log("123121")
            let temp = $(resp).find("#questionId").html();
            $("body").html(temp);
            //일단 body 사이드바의 여부는 모름
            }
        })
    });
}
//---------제목을 클릭했을때 상세보기 (DOMcontent 보류중)

// document.addEventListener("DOMContentLoaded", function() {
//     let links = document.querySelectorAll(".link");
//     links.forEach(link => {
//         link.addEventListener("click", function() {
//             let url = this.innerText.trim();
//             window.location.href = url;
//         });
//     });
// });

function qusnum(qusnum){
    alert(qusnum);
    $.ajax({
        url: '/qaview',
        type: 'POST',
        data: { qusNum: qusnum },
            success: (resp) => {
                console.log("123123")
                $(".qaview-container").html(resp);
            }
        })
    }

        
// });
//------------question 부분--------------------------

//질문글 저장
function qusWrite(){
    let btnQaWrite = document.querySelector('.qaWrite');
    let content = document.querySelector('.input-question').value; 
    let title = document.querySelector('.input-title').value;

        btnQaWrite.addEventListener('click', function() {
        $.ajax({
            url: '/question', // 저장할 경로 아직 모름
            type: 'POST',
            data: { qusCon: content, qusTitle: title },
            success: (resp)=>{
                alert('작성이 완료 되었습니다');     
            }
        });
    });
}
// let btnQaCancel = document.querySelector('.qaCancel');

// btnQaCancel.addEventListener('click', function(){
//     window.location.href= "/qa.html";
// });

// 위 코드는 html 이동 밑 코드는 html 부분 변경 적용 안될시 window.location.href 는 이런식으로 변경할것
// document.querySelector(".qaCancel").onclick = () => {
//     $.ajax({
//         url : "/qa",
//         type: "GET",
//         success: (resp) => {
//             console.log("index")
//             let temp = $(resp).find("#qaBoard");
//             $("#questionId").html(temp)            
//         }
//     });
// }
    


//-------------answer 부분---------------------------------
//답변글 저장
/*let btnAnsWrite = document.querySelector('.ansWrite');

    btnAnsWrite.addEventListener('click', function() {
    let con = document.querySelector('.input-answer').value; 
    
    $.ajax({
        url: 'msmAnswer', // 저장할 경로 아직 모름
        type: 'POST',
        data: { ansCon: con },
        success: (resp)=>{
            alert('답변이 완료 되었습니다');
            window.location.href= "/qa.html";
        }
    });
});

// 취소 버튼 클릭 이벤트
$('.ansCancel').click(function() {
    window.location.href = '/qa'; // 이동할 페이지 경로
});








let btnAnsCancel = document.querySelector('.ansCancel');
btnAnsCancel.addEventListener('click', function(){
    window.location.href= "/qa.html";
});

//------------qaview 부분---------------------------
let btnBack = document.querySelector('.qaback');
btnBack.addEventListener('click', function(){
    window.localStorage.href="/qa.html"
}); */
