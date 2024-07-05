function stock(){
    let findStr="";
    if(sessionStorage.getItem("findStr")!=null){
        findStr = sessionStorage.getItem("findStr");
    }
    $.ajax({
        url:"/stock",
        type:"/GET",
        success:(resp)=>{
            let temp=$(resp).find(".stock");
            $(".stock").html(temp);
            search();
        }
    })
}

function search(){
    let btnSearch = document.querySelector(".btnSearch");
    let findStr=sessionStorage.getItem(".findStr");
    if(findStr != null){
        $(".findStr").val(findStr);
    }
    btnSearch.addEventListener('click',()=>{
        findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);

        $.ajax({
            url:'/stock',
            type:'GET',
            data:{"findStr":findStr},
            success:(resp)=>{
                let temp=$(resp).find(".stockitems");
                $(".stockitems").html(temp);
            }
        })
    })
}
search();

$(document).ready(function(){
    graph();
});

$.ajax({
    url: "/stockgraph",
    type: "GET",
    data: {},
    dataType: "json",
    success: function(response) {
        if (response.x.length === 0 && response.y.length === 0) {
            console.log("데이터가 없습니다.");
            // 또는 사용자에게 알리는 등의 처리를 추가할 수 있습니다.
        } else {
            // 데이터가 있는 경우 처리
            console.log(response);
        }
    },
    error: function() {
        alert("데이터를 가져오는데 실패했습니다.");
    }
});

function graph(){
    $.ajax({
        url: "/stockgraph",
        type:"GET",
        dataType:"json",//배열을 가져올 땐 json
        success:function(resp){
            let x=[];
            let y=[];
            new Chart(document.getElementById("bar-chart"),{
                type: 'bar',
                data: {
                    labels: resp.x,
                    datasets: [
                        {
                        label: "현 재고",
                        backgroundColor: ['plum','skyblue','yellow','orange','pink','yellowgreen','purple'],
                        data:resp.y
                        }
                    ]
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '제품별 재고 현황'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        },
        error:function(){
            alert("실패");
        }
    });
}