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
                    // let obj = await import ("/js/csy_board.js");
                        // obj.boardList();
                        let obj = await import ("/js/csy_board.js");
                        if (resp != -1) {
                            obj.csyDetail(resp);
                        } else {
                            alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
                        }
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