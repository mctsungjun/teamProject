$(function(){
    noticelist();
})
function noticelist(){
        $.ajax({
            url : "/bjmNoticeList",
            type : "GET",
            // data : {"nowPage" : nowPage, "findStr" : noticePage.findStr},
            success : (resp) => {
                $(".container").html($(resp).find(".noticeList"));
                // $(resp).find(".noticeList");
                noticeRegister();
                // noticeView();
            }
        })
}

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
const noticeViewer = (sno) => {
    console.log("failed")
    $.ajax({
        url : "/notice/bjmNoticeView",
        type : "GET",
        data : {"sno" : sno},
        success : (resp) =>{
            let temp = $(resp).find(".noticeView");
            $(".container").html(temp);
            noticeView();
        }
    })
}
function noticeRegisterR(){
    let bjmBtnRegisterR = document.querySelector(".bjmBtnRegisterR")
    bjmBtnRegisterR.addEventListener("click",() =>{
        let temp = document.frmRegister;
        let frm = new FormData(temp);
        $.ajax({
            url : "/bjmRegisterR",
            type : "POST",
            data : frm,
            processData : false,
            contentType : false,
            success : (resp) => {
                console.log(resp)
                console.log("성공")
                noticelist();
                uploadImage()
            }
        })

    })
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
   
    // 취소 버튼 클릭 시
    let bjmBtnCancelR = document.querySelector(".bjmBtnCancelR")
    bjmBtnCancelR.addEventListener("click",()=>{
        let result = confirm('목록');
        if (result) {
            window.location.href = '/bjmNoticeList'; // home으로 이동
        }
        // noticelist();
    })
}
function noticeView(){
    let bjmBtnList = document.querySelector(".bjmBtnList")
    bjmBtnList.addEventListener("click",() => {
        console.log("목록으로 이동")
        noticelist();
    })
    let bjmBtnDel = document.querySelector(".bjmBtnDel")
    bjmBtnDel.addEventListener("click",() => {
        console.log("삭제")
        noticelist();
    })
    let bjmBtnModify = document.querySelector(".bjmBtnModify")
    bjmBtnModify.addEventListener("click",()=>{
        $.ajax({
            url: "/notice/bjmModify",
            type: "GET",
            success: (resp) => {
                let temp = $(resp).find(".noticeModify");
                $(".container").html(temp);
                // noticeModify()이벤트 바인딩 필요한듯
            }
        });
    })
    let noticeNext = document.querySelector(".noticeNext")
    noticeNext.addEventListener("click",()=>{
        console.log("다음")
        noticelist(); // 추후에 이후 공지글로이동
    })
    let noticePrev = document.querySelector(".noticePrev")
    createEle
    noticePrev.addEventListener("click",()=>{
        console.log("이전")
        noticelist(); // 추후에 이전 공지글로이동
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

