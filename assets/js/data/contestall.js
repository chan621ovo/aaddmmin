$(function(){
    contestAll(datePer , GP , keyWordVal)
    contestDataNum()
});


function contestDataNum(){
    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/admin/contest/dashboard`,
        success: function(x){
            console.log(x)
            $(".all_num1").siblings("h4").text(x.contestCount);
            $(".all_num2").siblings("h4").text(`${comma(x.totalReward)}원`);
            $(".all_num3").siblings("h4").text(x.joinCount+ "명");
        },
        error : function(err){
            console.log(err);
        }
    })
};

function contestName(target){
    
    keyWordVal = $(target).val();

    console.log(keyWordVal)
    contestAll(datePer , GP , keyWordVal)
};

function contestAll(datePer , GP , keyWordVal){

    $.ajax({
        url: `${E}/api/v1/admin/contest?keyword=${keyWordVal}&page=${GP}`,
        method: 'GET',
        success: function(x){
            console.log(x.contestList)
            var maxPage = x.maxPage
            var count = x.count

            var sum = 0
            
            //테이블 초기화
            $(".contestall_listbox").html("");

            x.contestList.map( (m) => {
                var contestAllList =
                `
                <tr data-idx=${m.idx} class="contest_all">
                    <td>
                        <a href="javascript: void(0);" class="text-body">${m.idx}</a>
                    </td>
                    <td><a href="javascript: void(0);" class="text-body fw-bold">${m.period}</a> </td>
                    <td><a href="javascript:;" style="color: #000" data-idx="${m.idx}" onclick="contestInfo(this)">${m.contestName}</a></td>
                    <td>${m.host}</em></td>
                    <td>${comma(m.total_payment)}원</td>
                    <td>
                        <a href="javascript:;" class="contest_btn contest_win" onclick="contestWinnerList('${m.idx}' , '${m.status}')" data-status="${m.status}" data-bs-toggle="modal" data-bs-target=".transaction-detailModal"><span>선정</span></a>
                    </td>
                    <td>
                        <a href="javascript:;" class="contest_btn contest_rec" onclick="contestCorrect(${m.idx})">수정</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="contest_btn contest_del" onclick="contestDelete('${m.idx}' , '${m.exposure}')" data-exposure="${m.exposure}" ><span class="exposure_btn">ON</span></a>
                    </td>
                    <td class="more_view">
                        <a href="javascript:;" class="contest_btn contest_go" onclick=contestIngList(this); data-idx=${m.idx} data-name="${m.contestName}">GO</a>
                    </td>
                </tr>
                ` 
                $(".contestall_listbox").append(contestAllList);
                sum += m.total_payment;

            });

            $(".contest_del").each(function (index, element) {
        
                var val = $(this).attr("data-exposure");
              
                if(val == 1){
                    $(this).removeClass("active")
                    $(this).find("span").text("ON")
                }else{
                    $(this).addClass("active")
                    $(this).find("span").text("OFF")
                }
            });

            $(".contest_win").each(function (index, element) {
        
                var val = $(this).attr("data-status");
              
                if(val == "pending"){
                    $(this).addClass("active")
                    $(this).find("span").text("미선정")
                }else{
                    $(this).removeClass("active")
                    $(this).find("span").text("선정")
                }
            });

            payPaging(datePer , maxPage , count  , GP)
            
        },error:function(request, status, error){
            console.log(error)
        }
    });
};

function contestWinnerList(idx , status){

    $.ajax({
        type : 'GET',
        url : `${E}/api/v1/admin/winner/${idx}`,
        success: function(x){

            if(x.length == 0){
                
                $(".contesting_listbox2").html("<tr><th>수상자 정보가 없습니다.</th></tr>");

            }else{
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
                            <td>${comma(x.reward)}원</td>
                            <td>${comma(x.payment)}원</td>
                        </tr>
                        ` 

                        $(".contesting_listbox2").append(contestWinnerList);
                        $(".c_name").text(x.contestName);
                        $(".c_prize").text(x.complete);
                        $(".c_fee").text((x.fee == 0 ? "미 부담" : "부담" ));
                        $(".fee_payment").text((x.fee == 0 ? "20%" : "3.3%" ));
                    });
                }
            }
        },
        error : function(err){
            console.log(err);
        }
    })
};

function contestCorrect(idx){

    //로그인 유지시
	$.cookie('CN' , null,{ path : '/' });
	$.cookie('CN' , idx,{ path : '/' });

    location.href = "/form-elements.html";
};

//콘테스트 노출
function contestDelete(idx , ex){

    // var massage = prompt("홈페이지에 노출하시겠습니까?? 노출을 하고싶다면 노출이라고 입력해 주세요.")

    // if(massage == "노출"){

    // }else{

    // }
    if(ex == 0){
        $.ajax({
            url: `${E}/api/v1/admin/contest/exposure/${idx}`,
            method : 'PATCH',
            data : {
                exposure : Number(1)
            },
            success : function(x){
                console.log("성공")
                contestAll(datePer , GP , keyWordVal)
            },error : function(){
                console.log("실패")
            }
        });

    }else{

        $.ajax({
            url: `${E}/api/v1/admin/contest/exposure/${idx}`,
            method : 'PATCH',
            data : {
                exposure : Number(0)
            },
            success : function(x){
                console.log("성공")
                contestAll(datePer , GP , keyWordVal)
            },error : function(){
                console.log("실패")
            }
        });
    }
};


function contestIngList(target){

    var idx = $(target).attr("data-idx");
    var name = $(target).attr("data-name");

    $.cookie('HT' , null,{ path : '/' });
    $.cookie('HT' ,  idx,{ path : '/' });
    $.cookie('CN' , null,{ path : '/' });
    $.cookie('CN' ,  name,{ path : '/' });

    location.href = "dashboard-saas.html"; 
};
