$(function(){
    noticelist(2,"");
    // alert("iiiii")
})
function noticelist(nowPage,findStr){
    // alert(nowPage)
    $.ajax({
        // /bjmNoticeList?nowPage=1
        url : "/bjmNoticeList",
        type : "GET",
        data : {"nowPage" : nowPage, "findStr" : findStr},
        success : (resp) => {
            $(".container").html($(resp).find(".noticeList"));
            noticeRegister();
            document.querySelector(".bjmBtnSearch").onclick =()=>{
                let findStr = document.querySelector(".findStr").value;
                noticelist(findStr);
            }
        }
    })
}
// NoticeList페이지에서 작성 버튼
function noticeRegister(){
    let bjmBtnRegister = document.querySelector(".bjmBtnRegister")
    bjmBtnRegister.addEventListener("click",()=>{
        let temp = document.frmRegister;
        let frm = new FormData(temp);
        $.ajax({
            url : "/notice/bjmRegister",
            type : "POST",
            dadta : frm,
            processData : false,
            contentType : false,
            success : (resp) => {
                let temp = $(resp).find(".noticeRegist");
                $(".container").html(temp);
                noticeRegisterR();
            }
        })
    })
}
// NoticeRegister 페이지 버튼 관리
function noticeRegisterR(){
    let bjmBtnRegisterR = document.querySelector(".bjmBtnRegisterR")
    bjmBtnRegisterR.addEventListener("click",() =>{
        let temp = document.frmRegister;
        let frm = new FormData(temp);
        $.ajax({
            url : "/notice/bjmRegisterR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : (resp) => {
                console.log(resp)
                noticelist("");
                // uploadImage()
            }
        })

    })
    function uploadImage(file) {
        var data = new FormData();
        data.append("file", file);
        $.ajax({
          url: '/uploadImage',
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
   
    // 취소 버튼 클릭 시
    let bjmBtnCancel = document.querySelector(".bjmBtnCancel")
    bjmBtnCancel.addEventListener("click",()=>{
        let result = confirm('목록');
        if (result) {
            window.location.href = '/bjmNoticeList';
        }
    })
}
// NoticeView페이지로 이동
function noticeViewer (sno) {
    $.ajax({
        url : "/notice/bjmNoticeView",
        type : "GET",
        data : {"sno" : sno},
        success : (resp) =>{
            let temp = $(resp).find(".noticeView");
            $(".container").html(temp);
            noticeView(sno);
        }
    })
}
// noticeView 페이지 버튼 관리
function noticeView(sno){
    let bjmBtnList = document.querySelector(".bjmBtnList")
    bjmBtnList.addEventListener("click",() => {
        console.log("목록으로 이동")
        noticelist("");
    })
    let bjmBtnDel = document.querySelector(".bjmBtnDel")
    bjmBtnDel.addEventListener("click",() => {
        let del = confirm("Delete");
        if(!del) return;
        $.ajax({
            url : "/notice/bjmDelete",
            type : "GET",
            data : {"sno" : sno},
            success : (resp) => {
                noticelist("");
            }
        })
    })
    let bjmBtnModify = document.querySelector(".bjmBtnModify")
    bjmBtnModify.addEventListener("click",()=>{
        $.ajax({
            url: "/notice/bjmModify",
            type: "GET",
            data: {"sno": sno},
            success: (resp) => {
                let temp = $(resp).find(".noticeModify");
                $(".container").html(temp);
                noticeModifyR(sno);
            }
        });
    })
    
    let noticeNext = document.querySelector(".noticeNext")
    noticeNext.addEventListener("click",()=>{
        console.log("다음")
        noticelist(); // 추후에 이후 공지글로이동
    })
    let noticePrev = document.querySelector(".noticePrev")
    noticePrev.addEventListener("click",()=>{
        console.log("이전")
        noticelist(); // 추후에 이전 공지글로이동
    })
}
// NoticeModify페이지 버튼 관리
function noticeModifyR(sno){
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
            success : (resp) => {
                console.log(resp);
                noticeViewer(sno);
            }
        })
    })
    let bjmBtnCancelR = document.querySelector(".bjmBtnCancelR")
    bjmBtnCancelR.addEventListener("click",() => {
        alert("1")
        $.ajax({
            url : "/notice/bjmNoticeView",
            type : "GET",
            data : {"sno" : sno},
            success : (resp) =>{
                let temp = $(resp).find(".noticeView");
                $(".container").html(temp);
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
		url : '/post/image-upload',  
		contentType : false,
		processData : false,
		enctype : 'multipart/form-data',                                  
		success : function(data) {   
			$(el).summernote('insertImage', "${pageContext.request.contextPath}/assets/images/upload/"+data, function($image) {
				$image.css('width', "100%");
			});
			console.log(data);
		}
	});
}

