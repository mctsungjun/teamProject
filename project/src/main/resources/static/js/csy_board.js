export function boardList() {
    $.ajax ({
        url : "/board",
        type: "GET",
        success: (resp) => {
            let temp = $(resp).find("#board");
            $(".content").html(temp);
        }
    })
}

export function csyPostDelete(sno) {
    let yn = confirm('게시물을 삭제하시겠습니까?');
    if (!yn) return;

    $.ajax ({
        url : "/board/delete",
        type: "GET",
        data: {"sno" : sno},
        success: (resp) => {
            boardList();
            setTimeout(() => {
                alert(resp)
            }, 200);
        }
    })
}

// * summernote에 내용 넘겨야함
export function csyPostModify(sno) {
    $.ajax ({
        url : "/board/modify",
        type: "POST",
        data: {"sno" : sno},
        success: (resp) => {
            let temp = $(resp).find("#boardModify");
            $(".content").html(temp);                 // * navbar : index.html
        }
    })
}

export function csyDetail(sno) {
    $.ajax({
        url : "/board/detail",
        type: "GET",
        data: {"sno" : sno},
        success: (resp) => {
            let temp = $(resp).find("#boardDetail");
            $(".content").html(temp);                 // * navbar : index.html
        }
    })
}

export function csyBoard() {
    // * "글 목록" 텍스트 클릭시 전체 리스트 보여줌
    let boardListTitle = document.querySelector(".boardListTitle");
    boardListTitle.onclick = () => {
        boardList();
    }

    // let boardList = () => {
    //     $.ajax ({
    //         url : "/board",
    //         type: "GET",
    //         success: (resp) => {
    //             let temp = $(resp).find("#board");
    //             $(".content").html(temp);
    //         }
    //     })
    // }

    let btnBoardNewPost = document.querySelector(".btnBoardNewPost");
    btnBoardNewPost.onclick = () => {
        $.ajax ({
            url : "/board/post",
            type: "POST",
            // data: {"findStr" : findStr},               // * 이거 selected icon 넘겨줘야함
            success: (resp) => {
                let temp = $(resp).find("#boardPost");
                $(".content").html(temp);                 // * navbar : index.html
            }
        })
    }

    let btnSearch = document.querySelector(".btnSearch");
    btnSearch.onclick = () => {
        let findStr = $(".findStr").val();
        $.ajax ({
            url : "/board",
            type: "GET",
            data: {"findStr" : findStr},
            success: (resp) => {
                let temp = $(resp).find("#board");
                $(".content").html(temp);
            }
        })
    }
}