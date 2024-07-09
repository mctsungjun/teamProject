(
    function init(){
        // 검색 버튼 이벤트
        $(".bjmBtnSearch").on("click", ()=>{
            let findStr = $(".findStr").val();
            noticelist(1,findStr);
        })
        // 작성 버트 이벤트
        // let bjmBtnRegister = document.querySelector(".bjmBtnRegister")
        // bjmBtnRegister.addEventListener("click",()=>{
        //     noticeRegister();
        // })
})()

export function noticelist(nowPage,findStr) {
    $.ajax({
        url : "/bjmNoticeList",
        type : "GET",
        data : {"nowPage" : nowPage, "findStr" : findStr},
        success : (resp) => {
            let temp = $(resp).find(".noticeList");
            $(".content").html(temp);
            // let bjmBtnRegister = document.querySelector(".bjmBtnRegister")
            // bjmBtnRegister.addEventListener("click",()=>{
            //     noticeRegister();
            // })

            $(".bjmBtnSearch").on("click", ()=>{
                let findStr = $(".findStr").val();
                noticelist(nowPage,findStr);
            })
        }
    })
}

// NoticeList페이지에서 작성 버튼
export function noticeRegister(){
    $.ajax({
        url : "/notice/bjmRegister",
        type : "GET",
        success : (resp) => {
            let temp = $(resp).find(".noticeRegist");
            $(".content").html(temp);

            // let bjmBtnRegisterR = document.querySelector(".bjmBtnRegisterR")
            // bjmBtnRegisterR.addEventListener("click",() =>{
            //     let temp = document.frmRegister;
            //     let frm = new FormData(temp);
            //     $.ajax({
            //         url : "/notice/bjmRegisterR",
            //         type : "POST",
            //         data : frm,
            //         processData : false,
            //         contentType : false,
            //         success : (resp) => {
            //             console.log(resp)
            //             noticelist(1,"");
            //         }
                // })
            // }}
        // )

            // 취소 버튼 클릭 시
            let bjmBtnCancel = document.querySelector(".bjmBtnCancel")
            bjmBtnCancel.addEventListener("click",()=>{
                $.ajax({
                    url : "/bjmNoticeList",
                    type : "GET",
                    data : {"nowPage" : 1,"findStr":""},
                    success : (resp) =>{
                        let temp = $(resp).find(".noticeList");
                        $(".content").html(temp);
                        noticelist(1,"")
                    }
                })
            })
        }
    })
}

export function bjmRegister(frm) {
    let form = new FormData(frm);
    $.ajax({
        url : "/notice/bjmRegisterR",
        type : "POST",
        data : form,
        processData : false,
        contentType : false,
        success : (resp) => {
            console.log(resp)
            noticelist(1,"");
        }
    })
}

// 취소 버튼 클릭 시
export function bjmRegisterCancel() {
    $.ajax({
        url : "/bjmNoticeList",
        type : "GET",
        data : {"nowPage" : 1,"findStr":""},
        success : (resp) =>{
            let temp = $(resp).find(".noticeList");
            $(".content").html(temp);
            noticelist(1,"")
        }
    })
}




// NoticeRegister 페이지 버튼 관리
function noticeRegisterR(){
    function uploadImage(file) {
        var data = new FormData();
        data.append("file", file);
        $.ajax({
          url: '/uploadImage', // 서버에서 이미지 업로드를 처리할 URL
          method: 'POST',
          data: data,
          processData: false,
          contentType: false,
          success: function(response) {
            $('#summernote').summernote('insertImage', response.url);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + " " + errorThrown);
          }
        });
    }
}
// NoticeView페이지로 이동
export function noticeViewer(sno) {
    $.ajax({
        url : "/notice/hit",
        type : "POST",
        data : {"sno" : sno},
        success : () => {
            $.ajax({
                url : "/notice/bjmNoticeView",
                type : "GET",
                data : {"sno" : sno},
                success : (resp) =>{
                    let temp = $(resp).find(".noticeView");
                    $(".content").html(temp);
                    // noticeView(sno);
                }
            })
        }
    })
}















// noticeView 페이지 버튼 관리
// function noticeView(sno){
//     let bjmBtnList = document.querySelector(".bjmBtnList")
//     bjmBtnList.addEventListener("click",() => {
//         console.log("목록으로 이동")
//         noticelist(1,"");
//     })
//     let bjmBtnDel = document.querySelector(".bjmBtnDel")
//     bjmBtnDel.addEventListener("click",() => {
//         let del = confirm("Delete");
//         if(!del) return;
//         $.ajax({
//             url : "/notice/bjmDelete",
//             type : "GET",
//             data : {"sno" : sno},
//             success : (resp) => {
//                 noticelist(1,"");
//             }
//         })
//     })
//     let bjmBtnModify = document.querySelector(".bjmBtnModify")
//     bjmBtnModify.addEventListener("click",()=>{
//         $.ajax({
//             url: "/notice/bjmModify",
//             type: "GET",
//             data: {"sno": sno},
//             success: (resp) => {
//                 let temp = $(resp).find(".noticeModify");
//                 alert($(temp).html())
//                 $(".content").html(temp);
//                //noticeModifyR(sno);
//             }
//         });
//     })
    
//     let noticeNext = document.querySelector(".noticeNext")
//     noticeNext.addEventListener("click",()=>{
//         console.log("다음")
//         noticelist(1,""); // 추후에 이후 공지글로이동
//     })
//     let noticePrev = document.querySelector(".noticePrev")
//     noticePrev.addEventListener("click",()=>{
//         console.log("이전")
//         noticelist(); // 추후에 이전 공지글로이동
//     })
// }
// NoticeModify페이지 버튼 관리
export function noticeModifyR(sno){
    let bjmBtnModifyR = document.querySelector(".bjmBtnModifyR")
    bjmBtnModifyR.addEventListener("click",() => {
        alert("ModifyR버튼")
        let temp = document.frmModify
        let frm = new FormData(temp)
        $.ajax({
            url : "/notice/bjmModifyR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : async (resp) => {
                console.log(resp);
                var obj = await import ("/js/bjm_notice.js");
                obj.noticeViewer(sno);
            }
        })
    })
    let bjmBtnCancelR = document.querySelector(".bjmBtnCancelR")
    bjmBtnCancelR.addEventListener("click",() => {
        $.ajax({
            url : "/notice/bjmNoticeView",
            type : "GET",
            data : {"sno" : sno},
            success : (resp) =>{
                let temp = $(resp).find(".noticeView");
                $(".content").html(temp);
                noticeViewer(sno);
            }
        })
    })
}
// summernote
function imageUploader(file, el) {
	var formData = new FormData();
	formData.append('file', file);
  
	$.ajax({                                                              
		data : formData,
		type : "POST",
        // url은 자신의 이미지 업로드 처리 컨트롤러 경로로 설정해주세요.
		url : '/post/image-upload',  
		contentType : false,
		processData : false,
		enctype : 'multipart/form-data',                                  
		success : function(data) {   
			$(el).summernote('insertImage', "${pageContext.request.contextPath}/assets/images/upload/"+data, function($image) {
				$image.css('width', "100%");
			});
            // 값이 잘 넘어오는지 콘솔 확인 해보셔도됩니다.
			console.log(data);
		}
	});
}

