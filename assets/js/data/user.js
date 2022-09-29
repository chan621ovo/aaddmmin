$(function(){
    userAll(datePer , GP , keyWordVal)
    userCount()
});

function userCount(){
    $.ajax({
        url: `${E}/api/v1/admin/user/count`,
        method : 'GET',
        success : function(x){

            $(".user_num1").text(x.total);
            $(".user_num2").text(x.client);
            $(".user_num3").text(x.artrator);
        }
    })
}

function userDetailInfo(idx){
    $.ajax({
        url: `${E}/api/v1/admin/user/detail/${idx}`,
        method : 'GET',
        success : function(x){
            
            $(".uinfo_1").text((x.account == null ? "없음" : x.account));
            $(".uinfo_2").text(x.nickname);
            $(".uinfo_3").text(x.phone);
            $(".uinfo_4").text(x.contestCount + "건");
            $(".uinfo_5").text(x.createDate);
            $(".uinfo_6").text(x.userName);
            $(".uinfo_7").text((x.type == 1 ? "Client" : "Artrator" ));
            $(".uinfo_8").text(x.email);
            $(".uinfo_9").text(x.joinCount + "건");
            $(".uinfo_10").text(x.loginDate);
            $(".uinfo_11").text((x.naverEmail == null ? "없음" : x.naverEmail));
            $(".uinfo_12").text((x.bizName == null ? "없음" : x.bizName ));

            var idxArr = []
            var userType = $(".uinfo_7");
            idxArr.forEach.call((userType) , (item , idx) => {
                if($(item).text() == "Artrator"){
                    $(item).css("color" , "#FF9298")
                }
                if($(item).text() == "Client"){
                    $(item).css("color" , "#00AFFF")
                }
            });
        }
    })
}


function userName(target){
    keyWordVal = $(target).val();
    userAll(datePer , GP , keyWordVal)
    console.log(keyWordVal)
};

function userAll(datePer , GP , keyWordVal){

    $.ajax({
        url: `${E}/api/v1/admin/user?keyword=${keyWordVal}&page=${GP}`,
        method: 'GET',
        success: function(x){
            var maxPage = x.maxPage
            var count = x.count

            //테이블 초기화
            $(".userlist_box").html("");

            x.userList.map(x => {

                var userData =
                `
                <tr class="user_info" data-bs-toggle="modal" data-bs-target=".transaction-detailModal" onclick="userDetailInfo(${x.idx})">
                    <td>
                        <a href="javascript: void(0);" class="text-body">${x.idx}</a>
                    </td>
                    <td>
                        <h5 class="font-size-14 mb-1 user_name">
                            <a href="javascript: void(0);" class="text-dark">${x.name}</a>
                        </h5>
                    </td>
                    <td>
                        <h4 class="user_nick">${x.nickname}</h4>
                    </td>
                    <td> 
                        <div>
                            <a href="javascript: void(0);" class="badge badge-soft-primary font-size-14 m-1 user_type">${(x.type == 1 ? "Cli" : "Art")}</a>
                        </div>
                    </td>
                    <td>${x.email}</td>
                    <td>${(x.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`))}</td>
                    <td>${x.createDate}</td>
                    <td>${x.loginDate}</td>
                </tr>
                ` 
                $(".userlist_box").append(userData);

                var idxArr = []
                var userType = $(".m-1");
                idxArr.forEach.call((userType) , (item , idx) => {
                    if($(item).text() == "Art"){
                        $(item).css("background-color" , "#FF9298").css("color" , "#fff")
                    }
                    if($(item).text() == "Cli"){
                        $(item).css("background-color" , "#00AFFF").css("color" , "#fff")
                    }
                });
            });
            payPaging(datePer , maxPage , count  , GP)
            
        },error:function(request, status, error){
            console.log(error)
        }
    });
};
