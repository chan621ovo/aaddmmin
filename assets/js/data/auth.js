//로그인
function authLogin(){
    if($(".auth_id").val() == "videocon" && $(".auth_pw").val() == "videocon"){
        location.href = "index.html";
    }else{
        alert("입력하신 정보를 확인해")
    }
    // var authId = $(".auth_id").val();
    // var authPw = $(".auth_pw").val();

    // $.ajax({
    //     url: `${EP}/auth_check`,
    //     method: 'POST',
    //     dateType: 'JSON',
    //     data: {
    //         "user_id" : authId,
    //         "user_password" : authPw,
    //     },
    //     success: function(x){
            
    //         //로그인 유지시
    //         $.cookie('UD' , null,{ path : '/' });
    //         $.cookie('UT' , null,{ path : '/' });
    //         $.cookie('UN' , null,{ path : '/' });
    //         $.cookie('UD' , x.data.Token,{ path : '/' });
    //         $.cookie('UT' , x.data.state,{ path : '/' });
    //         $.cookie('UN' , x.data.name,{ path : '/' });

    //         location.href = "index.html";

    //     },error:function(request, status, error){

    //         alert("아이디와 비밀번호를 확인해주세요");
    //     }
    // })
}

function authLogOut(){
    //로그인 아웃
    $.cookie('UD' , null,{ path : '/' });
    $.cookie('UT' , null,{ path : '/' });

    location.href = "auth-login.html";
};
