// 에디터 업그레이드: https://programmer93.tistory.com/50
// 충돌 해결법: https://tyrannocoding.tistory.com/52

// * 이미지 관련 참고: https://velog.io/@hhss2259/summernote-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%93%B0%EA%B8%B0-%EC%84%9C%EB%B9%84%EC%8A%A43-%EA%B5%AC%ED%98%84-%EC%BD%94%EB%93%9C
//* 이건 진짜 읽어야함: https://sirobako.co.kr/detail/49#google_vignette
// * 게시물과 게시글 이미지 맞추기 위함

// https://velog.io/@betweenhj702/%EC%84%9C%EB%A8%B8%EB%85%B8%ED%8A%B8-%ED%8E%B8%EC%A7%91%EA%B8%B0
// https://programmer93.tistory.com/31#google_vignette
export function summernote(content) {
    $(document).ready(function() {
        $('#summernote').summernote({
            height: 350,       // 에디터 높이
            minHeight: null,    // 최소 높이
            maxHeight: null,   // 최대 높이
            lang: "ko-KR",
            placeholder: "내용을 입력해주세요.",
            fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
            callbacks: {
                // * 이거 안하면 html 태그 같은거 합쳐서 붙여넣어짐.
                onPaste: function (e) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    document.execCommand('insertText', false, bufferText);
                },
            }
        });
    });
    if (content != null) {
        $("#summernote").summernote('pasteHTML',  content);
    }
}

export function csyPostSubmit() {
    // * 게시글 입력 후 전송 누르는 버튼
    document.querySelector(".btnCsyPostSubmit").onclick = () => {
        let temp = document.frmBoardPost;
        var content = temp.content.value;

        var imgCnt = content.search("img");
        var extract_content_html = content.replace(/(<([^>]+)>)/ig,"");
        if (temp.title.value == "") {
            alert("제목을 작성해주세요.")
        } else if (extract_content_html == "" && imgCnt == -1) {
            alert("게시물에 내용이 필요합니다.");
        } else {
            console.log("제목: " + temp.title.value);
            console.log("내용: " + temp.content.value);
            let frmPost = new FormData(temp);
            $.ajax({
                url: "/summernote/submit",
                type: "POST",
                data: frmPost,
                processData: false,
                contentType: false,
                success: async (resp) => {
                    let obj = await import ("/js/csy_board.js");
                        obj.boardList();
                    }
                });
            };
        }
    }

export function csyModifySubmit() {
    let temp = document.frmBoardPost;
    var content = temp.content.value;

    var imgCnt = content.search("img");
    var extract_content_html = content.replace(/(<([^>]+)>)/ig,"");
    if (temp.title.value == "") {
        alert("제목을 작성해주세요.")
    } else if (extract_content_html == "" && imgCnt == -1) {
        alert("게시물에 내용이 필요합니다.");
    } else {
        console.log("제목: " + temp.title.value);
        console.log("내용: " + temp.content.value);
        let frmModify = new FormData(temp);
        $.ajax({
            url: "/summernote/modify",
            type: "POST",
            data: frmModify,
            processData: false,
            contentType: false,
            success: async (resp) => {
                let obj = await import ("/js/csy_board.js");
                    // 해당 디테일 페이지로
                    obj.csyDetail(temp.sno.value);
                }
        });
    }
};