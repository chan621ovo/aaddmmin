$(function(){
    contestIng()
})

// 진행중인 공모전
function contestIng(){
    $.ajax({
        url: `${E}/api/v1/admin/participant/${HT}`,
        method: 'GET',
        success: function(x){   
            
            // 테이블 초기화
            $(".contesting_listbox").html("");

            //리스트
            if(x != "null" && x.length != "undefined" ){

                x.map((x , idx) => {
                    
                    var contestIngList =
                    `
                    <tr>
                        <td>${idx+1}</td>
                        <td><a href="javascript: void(0);" class="text-body fw-bold">${x.name}</a> </td>
                        <td>${x.nickname}</td>
                        <td>${x.email}</em></td>
                        <td>${x.phone}</td>
                        <td>
                            <i class="fab fa-cc-mastercard me-1"></i>
                            <a href="javascript:;">${x.video}</a>
                            <div class="video_box">
                                <video controls loop muted  preload="bbb">
                                    <source src="${x.video}">
                                </video>
                            </div>
                        </td>
                        <td>
                            <a class="contest_btn contest_view" onclick="videoView(this)" data-video="${x.video}" href="javascript:;">View</a>
                        </td>
                    </tr>
                    ` 

                    $(".contesting_listbox").append(contestIngList);
                });
            }
            $(".sum1").siblings("h4").text(CN);
            $(".sum2").siblings("h4").text(x.length);
            $(".sum3").siblings("h4").text(x.length);
            
        },error:function(request, status, error){
            console.log(error)
        }
    })
};

function contestWinner(){

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/admin/winner/${HT}`,
        success: function(x){

            $(".contesting_listbox2").html("")

            if(x != "null" && x.length != "undefined" ){
                
                x.map((x) => {
                    
                    var contestWinnerList =
                    `
                    <tr>
                        <th scope="row">
                            <div>
                                <span>${x.name} (${x.rank}등)</span>
                            </div>
                        </th>
                        <td>
                            <div>
                                <h5 class="text-truncate font-size-14">${x.phone}</h5>
                                <p class="text-muted mb-0">[${x.bank_name}] ${x.bank_num}</p>
                            </div>
                        </td>
                        <td>${x.jumin}</td>
                    </tr>
                    ` 
                    
                    $(".contesting_listbox2").append(contestWinnerList);
                    $(".c_name").text(x.contestName);
                    $(".c_prize").text(x.complete);
                });
            }
        },
        error : function(err){
            console.log(err);
        }
    })
};

function videoView(target) {
    $(target).closest("tr").find(".video_box").slideToggle(300);
    $(target).closest("tr").siblings().find(".video_box").slideUp(300);
    $(target).closest("tr").css("background-color" , "#d9f1f1")
    $(target).closest("tr").siblings().css("background-color" , "#fff")
};

$(".video_close").on("click" ,function(){
    $(".video_box").fadeOut(300);
});