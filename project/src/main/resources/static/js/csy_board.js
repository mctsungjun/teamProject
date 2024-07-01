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

export function csyNumPaging(pageToGo) {
    let findStr = $(".findStr").val();
    $.ajax ({
        url : "/board",
        type: "GET",
        data: {"findStr" : findStr, "nowPage": pageToGo },
        success: (resp) => {
            let temp = $(resp).find("#board");
            $(".content").html(temp);
            $('.findStr').val(findStr)
        }
    })
}


export function csyBoardLikePressed(like_checked, post_sno) {
    // var id = '<%=(String)session.getAttribute("id")%>';
    var user_id = "SampleID";

    $.ajax({
        url : "/board/detail/likePressed",
        type: "POST",
        async: false,
        data:  JSON.stringify({post_sno: post_sno, user_id: user_id, is_checked: like_checked }),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        cache: false,
        error: (resp) => {
            alert("잠시 후 다시 시도해주세요.");
        }
    })
}


export function csyBoard() {
    // * "글 목록" 텍스트 클릭시 전체 리스트 보여줌
    let boardListTitle = document.querySelector(".boardListTitle");
    boardListTitle.onclick = () => {
        boardList();
    }

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
                $('.findStr').val(findStr)
            }
        })
    }
}


export function csyPostComment(frm) {
    var user_id = "SampleID";
    frm.id.value = user_id;
    let form = $(frm).serialize();
    // alert(frm.id.value);
    console.log(form);
    $.ajax({
        url : "/board/detail/comments/post",
        type: "POST",
        data: form,
        success: (resp)=> {
            csyDetail(frm.post_sno.value);
        }
    })
}

export function csyDeleteComment(sno, post_sno) {
    let yn = confirm('정말 삭제하시겠습니까?');
    if (!yn) return;

    $.ajax({
        url : "/board/detail/comments/delete",
        type: "POST",
        data: {"sno": sno},
        success: (resp)=> {
            csyDetail(post_sno);
        }
    })
}