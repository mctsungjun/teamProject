export async function joinformBtn() {

    var obj = await import ('/js/sungIndex.js');
    var isProperForm = obj.joinform_chk();

    if (isProperForm) {
        let frm = document.joinForm;
        let frmData = new FormData(frm);
        // alert(frm);
        // alert(frmData.name.value);
        // alert("FormData: " + JSON.stringify(Object.fromEntries(frmData.entries())));
        //컨트롤러 /sung/registerR로 회원등록 정보 보냄
        $.ajax({
            url: "/sung/registerR",
            type: "POST",
            data: frmData,
            processData: false,  // 필수: FormData를 문자열로 변환하지 않음
            contentType: false,  // 필수: 컨텐츠 타입을 false로 설정하여 jQuery가 설정할 수 있도록 함
            success: function(resp) {
                console.log(resp);
                // 성공 시 처리할 코드
                $.ajax({
                    url:"/login",
                    type:"GET",
                    success:(resp)=>{
                let temp = $(resp).find(".change");
                    $(".content").html(temp);
                }
                })
            },
            error: function(xhr, status, error) {
                console.error('AJAX 오류 발생:', status, error);
                // 오류 발생 시 처리할 코드를 추가할 수 있습니다.
            }
        });
    }
    
}