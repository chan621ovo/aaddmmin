$(document).ready(function(){

    var partiModal = 
    `<div class="read_popup ing_popup">
        <div class="modal_loading">
            <img src="/images/Toploading(w).gif">
        </div>
        <div class="popup_bg popup_close"></div>
        <div class="popup_box1">
            <div class="popup_inner">
                <div class="popup_left">
                    <div class="left_top">
                        <div class="top_title">
                            <h2></h2>
                            <div class="top_cate">
                                <p>개최자 : <span class="company"></span></p>
                            </div>
                            <div class="top_cate">
                                <p>일정 : <span class="days"></span></p>
                            </div>
                        </div>
                    </div>
                    <div class="left_middle">
                        <div class="top_img">
                            <div class="img_box">
                                <img src="#" alt="콘테스트 포스터">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup_right">
                    <div class="popup_close">
                        <img src="/assets/images/close_close.png">
                    </div>
                    <div class="right_top">
                        <div class="right_title">
                            <h2>상세설명</h2>
                        </div>
                    </div>
                    <div class="right_middle">
                        <div class="right_sub ing_sub">
                            <dl>
                                <dt class="ing_line1">📌 먼저 확인해 주세요</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>영상 이용 목적</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>시상 내역</dt>
                                <dd class="reward_box"></dd>
                                <dd class="text_t1"></dd>
                            </dl>
                            <dl>
                                <dt>우린 이런 곳이에요</dt>
                                <dd></dd>
                            </dl>
                            <dl>
                                <dt>이런 느낌을 원해요</dt>
                                <dd class="ing_style"></dd>
                                <dd class="ing_ref">
                                    <a target="_blank" href="">참고 영상 보기</a>
                                    <img src="/assets/images/ref_btn.png">
                                </dd>
                            </dl>
                            <dl>
                                <dt class="ing_line2">👀 꼼꼼하게 확인해 주세요</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>참고해 주세요</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>양식을 지켜주세요.</dt>
                                <dd>
                                    <p><b>영상 길이</b> <span class="Vlength"></span></p>
                                    <span> , </span>
                                    <p><b>영상 비율</b> <span class="Vratio"></span></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>참고 파일</dt>
                                <dd>
                                    <a class="Hfile down_file">
                                        <p class="Hname"></p>
                                        <img src="/assets/images/ing_down.png" alt="download_icon">
                                    </a>
                                </dd>
                            </dl>
                            <dl>
                                <dt>추가 혜택</dt>
                                <dd>
                                    <p></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt class="ing_line3">📄 추가 자료가 필요해요</dt>
                                <dd>
                                    <p></p>
                                </dd>
                                <dd>
                                    <h4>* 참여하기 페이지에서 추가 자료를 제출해 주세요.<br>자료를 제출하지 않을 경우 해당 콘테스트에 참여할 수 없습니다.</h4>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    //상태값에 따른 모달 추가
    var modalVal = $(".modal_val").val();

    switch(modalVal){
        case "1" : $("#layout-wrapper").append(partiModal); break; // 메인
    }

    // 콘테스트 공통 팝업 컨트롤
    $(".popup_close").on("click" , function(){

        //모달창 닫기
        $(".read_popup").fadeOut(300);

        //닫기 애니메이션 제거
        $(".popup_box1 .popup_inner.active").removeClass("active");
        $(".popup_box2 .popup_inner.active").removeClass("active");
        $(".popup_box3 .popup_inner.active").removeClass("active");

        ScrollActive()

        //버튼 숨김
        $(".btn_box1").css("display" , "none");
    });

    /*********** 참고파일 다운 ***********/
    $(".Hfile").on("click", function () {

        $.ajax({
            headers: { Authorization: "Basic " + UD },
            url: `${E}/api/v1/admin/contest/source`,
            method: "POST",
            data: {contestId : CN},
            xhrFields: { responseType: "blob" },
            beforeSend: function () {
                $(".right_sub dl:nth-child(9) dd").addClass("active");
            },
            success: function (data, status, xhr) {
                $(".right_sub dl:nth-child(9) dd").removeClass("active");

                // check for a filename
                var filename = $(".Hname").text();
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
                alert("파일 다운로드는 로그인 후 이용할 수 있습니다. 다운로드가 안될 시 채널톡을 통해 문의 주세요!");
                $(".right_sub dl:nth-child(9) dd").removeClass("active");
            },
        });
    });

});

// 임시 상세보기 모달
function contestInfo(target){

    var idx = $(target).data("idx");

    $.ajax({
        headers : {"Authorization" : `Basic ${(UD == "null" || typeof UD == "undefined") ? "no-auth" : UD}`},
        url :`${E}/api/v1/admin/contest/detail/${idx}`,
        method:'GET',
        success: function(data){

            //기본 팝업설정
            $(".ing_popup").fadeIn(100);
            $(".modal_loading").addClass("active")  
            ScrollNone()
            
            
            setTimeout(function(){
                $(".modal_loading").removeClass("active") 
                $(".ing_popup .popup_inner").addClass("active");
            },500)
            
            //데이터 상세
            $(".ing_popup .top_title h2").text(`${data.name}`); // 제목
            $(".ing_popup .top_cate .days").text(`${data.period}`); // 날짜
            $(".ing_popup .top_cate .company").text(`${data.host}`); // 회사
            $(".ing_popup .top_img .img_box img").attr("src" , `${data.poster}`); 
            $(".ing_popup .right_sub dl:nth-child(2) dd p").text(`${data.purpose}`); //영상 이용 목적
            $(".ing_popup .right_sub dl:nth-child(7) dd p").html(`${data.script}`); //상세 설명
            $(".ing_popup .right_sub dl:nth-child(8) dd .Vlength").text(`${data.vLength}`); // 영상 길이
            $(".ing_popup .right_sub dl:nth-child(8) dd .Vratio").text(`${data.vRatio}`); // 영상 비율
            $(".ing_popup .right_sub dl:nth-child(10) dd p").html(`${(data.benefit == null) ? "추가 혜택이 없습니다." : data.benefit}`); // 영상 비율
            $(".ing_popup .right_sub dl:nth-child(11) dd p").html(`${(data.addInfoContent == null) ? "추가 자료가 없습니다." : data.addInfoContent }`) //추가 사항
        
            //파일 , 찜하기 , 참가하기 인덱스 생성
            $(".Hfile").attr("data-fileidx" , `${idx}`)
            $(".cont_like").attr("data-contlike" , `${idx}`);
            $(".cont_parti").attr("data-contparti" , `${data.screening}`);
            $(".cont_parti").attr("data-contnum" , `${idx}`);

            // 홈페이지 URL
            $(".ing_popup .right_sub dl:nth-child(4) dd").html("");
            if(data.homepage == ""){
                $(".ing_popup .right_sub dl:nth-child(4) dd").text("자유롭게 만들어주세요!")
                
            } else {
                for(let i=0; i< data.homepage.length; i++){
                    var link = 
                    `
                    <a target="_blank" href="${data.homepage[i]}">
                        <span>${data.homepage[i]}</span>
                    </a>
                    `
                    $(".ing_popup .right_sub dl:nth-child(4) dd").append(link)
                }
            };

            //비디오 스타일
            $(".ing_popup .right_sub dl:nth-child(5) .ing_style").html("");
            if(data.videoStyle == "free"){
                $(".ing_popup .right_sub dl:nth-child(5) .ing_style").text("자유롭게 제작해 주세요.");

            }else{
                data.videoStyle.map(x => {
                    var viedoRef =  `<span>${x}</span>`
                    $(".ing_popup .right_sub dl:nth-child(5) .ing_style").append(viedoRef);
                })
            }

            // 참고영상
            ((data.reference == null) ? $(".ing_ref").css("display" , "none") : 
                $(".ing_ref").css("display" , "block"), 
                $(".ing_ref a").attr("href" , `${data.reference}`)); 
            
            //상금 100%
            ((data.fee == 1) ? 
                $(".text_t1").text("*상금 100% 콘테스트입니다.") : 
                $(".text_t1").text("*비디오콘에서 진행되는 콘테스트는 수수료 20%를 제외한 상금이 제공됩니다."));

            //랭크 값 없을때 가공 후 처리
            if(data.ranks != "undefined"){
                $(".ing_popup .right_sub dl:nth-child(3) .reward_box").html("");

                for(var i = 0 ; i < data.ranks.length; i++ ){
                    var rewards = data.ranks[i].reward;
                    var rewardslist = `
                        <p><b class="prize_name">${i+1}등</b>  <span> : ${rewards}</span></p>
                    `
                    $(".ing_popup .right_sub dl:nth-child(3) .reward_box").append(rewardslist);
                }

                //수상작 네임
                var arr = [];
                var PrizeName = $(".prize_name");
                
                arr.forEach.call((PrizeName) , (item, idx) => {
                    var itxt = item.innerText;
                    switch(itxt){
                        case "1등" : $(item).text("대상"); break;
                        case "2등" : $(item).text("최우수상"); break;
                        case "3등" : $(item).text("우수상"); break;
                    }
                });
            };

            //파일 첨부 이름
            ((data.files == null) ? 
                $(".ing_popup .right_sub dl:nth-child(9) dd p").text("업로드된 참고 파일이 없어요.") : 
                $(".ing_popup .right_sub dl:nth-child(9) dd p").attr("href" , `${data.files[0].filename}`).text(`${data.files[0].filename}`));

            //찜하기 상태
            if(data.dibs == true){
                $(".cont_like").addClass("active")
                $(".cont_like img").attr("src" , "/img/pm_4r.png")
            } else{
                $(".cont_like").removeClass("active");
                $(".cont_like img").attr("src" , "/img/pm_4w.png")
            }

            //추가자료
            if(data.addInfoType == "0"){
                $(".ing_popup .right_sub dl:nth-child(11)").css("display" , "none")
            }else{
                $(".ing_popup .right_sub dl:nth-child(11)").css("display" , "block")
            }
        }
    })
};

function contestInfoRe(){
    
    //기본 팝업설정
    $(".ing_popup").fadeIn(100);
    $(".modal_loading").addClass("active")  
    ScrollNone()
            
            
    setTimeout(function(){
        $(".modal_loading").removeClass("active") 
        $(".ing_popup .popup_inner").addClass("active");
    },500)
            
    //수정 버튼
    $(".btn_box1").fadeIn(600)
    
    var contName = $(`input[name='contestName']`).val()
    var periodStart =  $(`input[name='periodStart']`).val()
    var periodEnd =  $(`input[name='periodEnd']`).val()
    var host = $(".contest_host").text();
    var poster = $(".img_poster").attr("src");
    var purpose = $(".contest_purpose option:selected").val()
    var videoLength = $(".contest_length option:selected").val()
    var videoRatio = $(".contest_ratio option:selected").val()
    var videoStyle = ($(`input[name='videoStyle']`).val() == 1) ? ["free"] : styleArr
    var script = $(`textarea[name='script']`).val().replace(/(\n|\r\n)/g, "<br>");
    var benefitScript = $(`textarea[name='bscript']`).val().replace(/(\n|\r\n)/g, "<br>")
    var addInfoScript = $(`textarea[name='ascript']`).val().replace(/(\n|\r\n)/g, "<br>")
    var addInfoContent = $('input:checkbox[name="addInfoContent1"]:checked').val()
    var benefit = $('input:radio[name="benefit"]:checked').val()
    var homepage = $(`input[name='homepage]`).val()
    var refVideo = $(`input[name='refvideo]`).val()
    var fee = $('input:radio[name="fee"]:checked').val()

    // //데이터 상세
    $(".ing_popup .top_title h2").text(`${contName}`); // 제목
    $(".ing_popup .top_cate .days").text(`${periodStart} ~ ${periodEnd}`); // 날짜
    $(".ing_popup .top_cate .company").text(`${host}`); // 회사
    $(".ing_popup .top_img .img_box img").attr("src" , `${poster}`); 
    $(".ing_popup .right_sub dl:nth-child(2) dd p").text(`${purpose}`); //영상 이용 목적
    $(".ing_popup .right_sub dl:nth-child(8) dd .Vlength").text(`${videoLength}`); // 영상 길이
    $(".ing_popup .right_sub dl:nth-child(8) dd .Vratio").text(`${videoRatio}`); // 영상 비율
    $(".ing_popup .right_sub dl:nth-child(7) dd p").html(`${script}`); //상세 설명
    $(".ing_popup .right_sub dl:nth-child(10) dd p").html(`${(benefit == "0") ? "추가 혜택이 없습니다." : ($(".cont_benefit").val() == typeof undefined ? "없음": benefitScript )}`);
    $(".ing_popup .right_sub dl:nth-child(11) dd p").html(`${(addInfoContent == "0") ? "추가 자료가 없습니다." : ($(".cont_addinfo").val() == typeof undefined ? "없음": addInfoScript )}`);

    //비디오 스타일
    var styleArr = []
    if(videoStyle == "1"){
        $(".ing_popup .right_sub dl:nth-child(5) .ing_style").text("자유롭게 제작해 주세요.");

    }else{
        $(".ing_popup .right_sub dl:nth-child(5) .ing_style").html("");
        var videoStylefInput = $(".contest_ref");
                
        styleArr.forEach.call((videoStylefInput) , (item , idx) => {
            if($(item).is(":checked" , true)){
                styleArr.push($(item).val());
            }
        });

        styleArr.map(x => {
            var viedoRef =  `<span>${x}</span>`
            $(".ing_popup .right_sub dl:nth-child(5) .ing_style").append(viedoRef);
        })
    }

    // 홈페이지 URL
    var homeUrlArr = [];
    $(".ing_popup .right_sub dl:nth-child(4) dd").html("");
    if(homepage == ""){
        $(".ing_popup .right_sub dl:nth-child(4) dd").text("자유롭게 만들어주세요!")
        
    } else {
        $(".contest_url").each(function (index, element) {
            homeUrlVal = $(this).val();
            if(!homeUrlVal){
                // return homeUrlArr.push("")
            }else{
                return homeUrlArr.push(homeUrlVal);
            } 
        });

        for(let i=0; i< homeUrlArr.length; i++){

            var link = 
            `
            <a class="link" target="_blank" href="${homeUrlArr[i]}">
                <span>${homeUrlArr[i]}</span>
            </a>
            `
            $(".ing_popup .right_sub dl:nth-child(4) dd").append(link)
        }
    };

    //상금 
    var rewardObjArr = []
    $(".ing_popup .right_sub dl:nth-child(3) .reward_box").html("")
    $(".cont_prize").each(function (index, element) {
        
        rewardVal = {reward : $(this).val() , rank: `${index +1}`, rankName: `${index +1+"등"}`, rwdName: $(this).attr("data-pn"), people: 1  }
      
        if(!rewardVal.reward){
            // return rewardObjArr.push("")
        }else{
            return rewardObjArr.push(rewardVal);
        }
    });

    for(var i = 0; i < rewardObjArr.length; i++ ){
        var rewards = rewardObjArr[i].reward;
        var rewardName = rewardObjArr[i].rwdName
        var rewardslist =
        `
            <p><b class="prize_name">${rewardName}</b>  <span> : ${rewards}</span></p>
        `
        $(".ing_popup .right_sub dl:nth-child(3) .reward_box").append(rewardslist);
    } 
    
    // 참고영상
    if(refVideo == "0"){
        $(".ing_ref").css("display" , "none")

    }else{
        $(".ing_ref").css("display" , "block"), 
        $(".ing_ref a").attr("href" , $(".cont_refvideo").val()) 
    };
    
    //상금 100%
    if(fee == "1"){
        $(".text_t1").text("*상금 100% 콘테스트입니다.")
    }else{
        $(".text_t1").text("*비디오콘에서 진행되는 콘테스트는 수수료 20%를 제외한 상금이 제공됩니다.")
    }
    
    //추가자료
    if(addInfoContent == "0"){
        $(".ing_popup .right_sub dl:nth-child(11)").css("display" , "none")
    }else{
        $(".ing_popup .right_sub dl:nth-child(11)").css("display" , "block")
    }

    // sourceFile: [$(".Hfile").attr("data-fileidx")],


    //모든 데이터
    var jsonData = {
        status : $('input:radio[name="status"]:checked').val(),
        contestName: $(`input[name='contestName']`).val(),
        homepages: homeUrlArr,
        reference : ($(`input[name='refvideo]`).val() == "0") ? $(".cont_refvideo").val("") : $(".cont_refvideo").val(),
        videoLength: $(".contest_length option:selected").val(),
        videoRatio: $(".contest_ratio option:selected").val(),
        purpose: $(".contest_purpose option:selected").val(),
        industry: $(".contest_industry option:selected").val(),
        periodStart: $(`input[name='periodStart']`).val(),
        periodEnd: $(`input[name='periodEnd']`).val(),
        script: $(`textarea[name='script']`).val().replace(/(\n|\r\n)/g, "<br>"), 
        rewards: rewardObjArr,
        fee: Number($('input:radio[name="fee"]:checked').val()),
        manager:($(".contest_ma1").val() != "") ? {name: $(".contest_ma1").val(), contact: $(".contest_ma1").val()} : "",
        style : ($('input:radio[name="videoStyle"]:checked').val() == "1") ? ["free"] : styleArr,
        benefit : ($('input:radio[name="benefit"]:checked').val() == "1") ? $("#h_benefit").val() : "없음",
        addInfoType : ($("#addInfoType1").is(":checked") != true) ? Number($("#addInfoType2").val()) + Number($("#addInfoType3").val()) : Number(0),
        addInfoContent : ($('input:checkbox[name="addInfoContent1"]:checked').val() == 0) ? null : $(".cont_addinfo").val(),
    };

    //추가 소스
    var changeFile = $(".Hfile").attr("data-fileHidden");

    if(typeof changeFile == "undefined"){
        console.log("파일 변경 하지 않음")
    }else{
        jsonData.sourceFile = [ changeFile ]
    }

    var jsonStData = JSON.stringify(jsonData);
    localStorage.removeItem("allData");
    localStorage.setItem("allData" , jsonStData);
}

function contestEditSend() {

    var allData = localStorage.getItem("allData");
    var jsonParseData = JSON.parse(allData);
    var massage = prompt("수정하시겠습니까?? 수정이 완료되셨다면 수정이라고 입력해 주세요.")
    
    if(massage == "수정"){

        $.ajax({
            url: `${E}/api/v1/admin/contest/detail/all/${CN}`,
            method : 'PATCH',
            data : jsonParseData,
            success : function(x){
                alert("콘테스트 상세 내용이 수정되었습니다.")
                window.location.reload();
            },error : function(){
                alert("콘테스트 상세 내용이 수정되었습니다.")
                window.location.reload();
            }
        });

    }else{
    
    }
};