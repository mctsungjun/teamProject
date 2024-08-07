let nowPage=1;

export function stock(){
    let findStr="";
    $.ajax({
        url:"/stock",
        type:"GET",
        // data:{"findStr":findStr,"nowPage":nowPage},
        data:{"findStr":findStr},
        success:(resp)=>{
            let temp=$(resp).find(".stockpage");
            $(".content").html(temp);
            stockloadItem(findStr,nowPage);
            stocksearch();        
            graph();
        }
    })
}

function stocksearch(){
    let btnSearch = document.querySelector(".btnSearch");
    let findStr="";
    stockloadItem(findStr,nowPage);
    btnSearch.addEventListener('click',()=>{
        findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);
        $.ajax({
            url:"/stock",
            type:'GET',
            data:{"findStr":findStr, "nowPage":nowPage},
            success:(resp)=>{
                let temp=$(resp).find(".stockitems");
                $(".stockitems").html(temp);
                stockloadItem(findStr,nowPage);
            }
        })
    })
}
// stocksearch();

//페이징
function stockloadItem(findStr,nowPage){
    
    $.ajax({
        url:"/stock",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:(resp)=>{
            let temp=$(resp).find(".stocklist");
            $(".stocklist").html(temp);
            sessionStorage.setItem("stockNowPage",nowPage);
            $(".btnPrevEnable").on("click",()=>{
                let findStr=$(".findStr").val();
                if(sessionStorage.getItem("stockNowPage")!=null){
                    nowPage=sessionStorage.getItem("stockNowPage");
                    if(nowPage>1) nowPage--;
                }
                stockloadItem(findStr,nowPage);
            })
            $(".btnNextEnable").on("click", ()=>{
                let findStr = $(".findStr").val();
                if(sessionStorage.getItem("stockNowPage") != null){
                    nowPage = sessionStorage.getItem("stockNowPage");
                    nowPage++;               
                }
                stockloadItem(findStr, nowPage);
            })
        }
    })
}

// $.ajax({
//     url: "/stockgraph",
//     type: "GET",
//     data: {},
//     dataType: "json",
//     success: function(response) {
//         if (response.x.length === 0 && response.y.length === 0) {
//             console.log("데이터가 없습니다.");
//             // 또는 사용자에게 알리는 등의 처리를 추가할 수 있습니다.
//         } else {
//             // 데이터가 있는 경우 처리
//             console.log(response);
//         }
//     },
//     error: function() {
//         alert("데이터를 가져오는데 실패했습니다.");
//     }
// });

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
                        backgroundColor: "#8753fb",
                        data:resp.y,
                        }
                    ]
                },
                options: {
                    // layout: {
                    //     padding: {
                    //       top: 80
                    //     }
                    //   },   
                    legend: { display: false },
                    // title: {
                    //     display: true,
                    //     text: '제품별 재고 현황',
                    //     family: 'Courier New',
                    //     fontColor : 'rgba(255, 255, 255, 0.8)',
                    //     fontSize : 20,
                    //     fontStyle: 300,
                    // },
                    scales: {
                        xAxes: [{
                            ticks:{
                                fontColor : 'rgba(255, 255, 255, 0.6)',
                                fontSize : 12,
                                fontStyle: 100,
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor : '#8753fb',
                                fontSize : 12,
                                fontStyle: 100,
                            }
                        }]
                    }
                }
            })
        },
        error:function(){
            
        }
    });
}