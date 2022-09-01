$(function(){

    //데이터 기본
    contestEdit()

    //미리보기 인덱스 변경
    $(".btn_box2 a").attr("data-idx" , CN);
});

//엔터 치환
$(".cont_need").on("change", function () {
    var text = document.getElementsByClassName("cont_need");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});

$(".cont_addinfo").on("change", function () {
    var text = document.getElementsByClassName("cont_addinfo");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});

$(".cont_benefit").on("change", function () {
    var text = document.getElementsByClassName("cont_benefit");
    var result = text.value.replace(/(\n|\r\n)/g, "<br>");
    text.value.replace(/(\n|\r\n)/g, "<br>");
});


//데이터 기본 호출
function contestEdit(){
    $.ajax({
        url: `${E}/api/v1/admin/contest/detail/all/${CN}`,
        method : 'GET',
        success : function(x){
            
            // 개최자 & 사업자 구   분
            $(".contest_host").text(x.userName);
            $(".contest_nick").text(x.host);
            $(".contest_type").text((x.bizName == null ? "개인" : x.bizName));

            //개최 플랜
            $(".contest_plan").val(x.plan).prop("selected", true);
            
            //진행 상태
            $(`input[name='status'][value=${x.status}]`).prop("checked", true);

            //콘테스트 제목
            $(".cont_name").val(x.contestName)

            //우린 이런 곳
            $(".contest_url1").val(x.homepages[0])
            $(".contest_url2").val(x.homepages[1])
            $(".contest_url3").val(x.homepages[2])

            //담당자 소통
            $(".contest_ma1").val((x.managerName == null ? "" : x.managerName))
            $(".contest_ma2").val((x.managerContact == null ? "" : x.managerContact))

            //업종 , 영상길이 , 목적 , 비율
            $(".contest_industry").val(x.industry).prop("selected", true);
            $(".contest_length").val(x.videoLength).prop("selected", true);
            $(".contest_purpose").val(x.purpose).prop("selected", true);
            $(".contest_ratio").val(x.videoRatio).prop("selected", true);

            //공모시작  , 공모종료
            $(".contest_start").val(x.periodStart);
            $(".contest_end").val(x.periodEnd);
            var strBr = "<br>"

            //영상제작 필요정보
            if(x.script != null){
                
                x.script = x.script.split('<br>').join("\r\n");
                $(".cont_need").val(x.script)
            }else{
                $(".cont_need").val(x.script)
                
            }

            //제작 방식
            if(x.videoStyle == "free"){
                $(".contest_free").prop('checked', true);
            }else{
                $(".contest_choice").prop('checked', true);
                
                var idxArr = []
                var refInput = $(".contest_ref");
                
                idxArr.forEach.call((refInput) , (item , idx) => {

                    if($(item).val() == x.videoStyle[0]){
                        $(item).prop("checked", true)
                    }
                    else if($(item).val() == x.videoStyle[1]){
                        $(item).prop("checked", true)
                    }else if($(item).val() == x.videoStyle[2]){
                        $(item).prop("checked", true)
                    }
                });
            };


            //참고 영상
            if(x.refVideo == null){
                $(`input[name='refvideo'][value=0]`).prop("checked", true);
            }else{
                $(`input[name='refvideo'][value=1]`).prop("checked", true);
                $(".cont_refvideo").val(x.refVideo);
            }

            //포스터 / 썸네일
            $(".img_poster").attr("src" , x.poster);
            $(".img_thum").attr("src" , x.thumbnail);

            //제작자에게 추가자료
            if(x.addInfoType == 0){
                $(`input[name='addInfoContent1']`).prop("checked", true);
                $(`input[name='addInfoContent2']`).prop("checked", false);
                $(`input[name='addInfoContent3']`).prop("checked", false);
            }
            else if(x.addInfoType == 1){
                $(`input[name='addInfoContent2']`).prop("checked", true);
                // x.addInfoContent = x.addInfoContent.split('<br>').join("\r\n");
                // $(".cont_addinfo").val(x.addInfoContent)

                if(x.addInfoContent != null){
                    x.addInfoContent = x.addInfoContent.split('<br>').join("\r\n");
                    $(".cont_addinfo").val(x.addInfoContent)
                }else{
                    $(".cont_addinfo").val(x.addInfoContent)
                }
            }
            else if(x.addInfoType == 2){
                $(`input[name='addInfoContent3']`).prop("checked", true);
            }
            else if(x.addInfoType == 3){
                $(`input[name='addInfoContent2']`).prop("checked", true);
                $(`input[name='addInfoContent3']`).prop("checked", true);
                // x.addInfoContent = x.addInfoContent.split('<br>').join("\r\n");
                // $(".cont_addinfo").val(x.addInfoContent)

                if(x.addInfoContent != null){
                    x.addInfoContent = x.addInfoContent.split('<br>').join("\r\n");
                    $(".cont_addinfo").val(x.addInfoContent)
                }else{
                    $(".cont_addinfo").val(x.addInfoContent)
                }
            }

            //수수료 부담
            if(!x.fee){
                $(`input[name='fee2'][value=0]`).prop("checked", true);
            }else{
                $(`input[name='fee'][value=1]`).prop("checked", true);
            }
            //추가 혜택
            if(!x.benefit){
                $(`input[name='benefit'][value=0]`).prop("checked", true);
            }else{
                $(`input[name='benefit'][value=1]`).prop("checked", true);
                // x.benefit = x.benefit.split('<br>').join("\r\n");
                // $(".cont_benefit").val(x.benefit);
                if(!x.benefit){
                    x.benefit = x.benefit.split('<br>').join("\r\n");
                    $(".cont_benefit").val(x.benefit)
                }else{
                    $(".cont_benefit").val(x.benefit)
                }
            }

            //결제금액
            $(".hold_prize").text(x.holdFee)
            $(".fee_prize").text(x.commission)
            $(".all_prize").text(x.totalReward)
            $(".tax_prize").text(x.surtax)
            $(".total_prize").text(x.totalPayment)

            //초기 파일
            $("#down_file").val(x.fileName)
            $("#down_btn").attr("data-fileidx" , x.fileId)

            //모달 파일
            $(".Hname").text(x.fileName);
            $(".Hfile").attr("data-fileidx" , x.fileId);

           //상금 
           $(".total_prize").val(x.totalReward)
            for(i = 0; x.ranks.length; i++){
                $(`.cont_prize${i+1}`).val(x.ranks[i].reward)
            }
        }
    })
}

/*********** 참고파일 업로드 ***********/
$("#upload_btn").on("change" ,function(){
    var form = $("#admin_upload")[0];
    var formData = new FormData(form);

    $.ajax({
        url: `${E}/api/v1/admin/temp`,
        method: "POST",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: formData,
        success: function (x) {

            //파일 업로드  변경
            $("#down_file").val(x.originName)
            $("#down_btn").attr("data-fileidx" , x.idx)

            $(".Hname").text(x.originName);
            $(".Hfile").attr("data-fileidx" , x.idx);
            $(".Hfile").attr("data-fileHidden" , x.idx);
        },
        error: function (err) {
            console.log(err);
            alert("업로드 중 오류가 발생했습니다. 이메일을 통해 제출해 주세요.");
        },
    });
});

/*********** 참고파일 다운 ***********/
$("#down_btn").on("click", function () {

    var filename = $("#down_file").val();
    console.log(filename)

    $.ajax({
        url: `${E}/api/v1/admin/contest/source`,
        method: "POST",
        data: {contestId : CN},
        xhrFields: { responseType: "blob" },
        success: function (data, status, xhr) {
            
            // check for a filename
            var filename = $("#down_file").val();
            console.log(filename)
            var disposition = xhr.getResponseHeader("Content-Disposition");
            if (disposition && disposition.indexOf("attachment") !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, "");
            }

            var type = xhr.getResponseHeader("Content-Type");
            var blob = new Blob([data], { type: type });

            if (typeof window.navigator.msSaveBlob !== "undefined") {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === "undefined") {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(downloadUrl);
                    }
                } else {
                    window.location = downloadUrl;
                }
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
});

//포스터 업로드
function bigPosterUpload(){

    // 폼데이터 생성
    var form = $(`#bigposter`)[0];      
    var formData = new FormData(form);

    $(".img_poster").attr("src" , "")
    
    $.ajax({
        url :`${E}/api/v1/admin/contest/poster/${CN}`,
        type:'PUT',
        enctype:'multipart/form-data',
        contentType : false,
        processData :false,
        data: formData,
        success: function(data){
           
            alert("업로드를 성공하였습니다.");
            $("#big_input").val("");
            $(".img_poster").attr("src" ,data.poster)
        },
        error : function(){
            alert("전송에 실패하였습니다.");
        }
    })
};

//썸네일 업로드
function smallPosterUpload(){
    
    // 폼데이터 생성
    var form = $(`#smallposter`)[0];      
    var formData = new FormData(form);

    $.ajax({
        url :`${E}/api/v1/admin/contest/thumbnail/${CN}`,
        type:'PUT',
        enctype:'multipart/form-data',
        contentType : false,
        processData :false,
        data: formData,
        success: function(data){
            
            alert("업로드를 성공하였습니다.");
            $(".sreq_file").val("");
            $(".img_thum").attr("src" ,data.thumbnail)
        },
        error : function(){
            alert("전송에 실패하였습니다.");
        }
    })
};