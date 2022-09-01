// var E = "http://3.34.190.242:8080";
var E = "http://3.39.194.4:8080";
var UD = $.cookie('UD');
var CN = $.cookie('CN');
var AD = $.cookie('AD');
const UT = $.cookie('UT');
const HT = $.cookie('HT');

var CP = 1
var datePer
var GP = 1
var keyWordVal = typeof keyWordVal == "undefined" ? "" : keyWordVal

// 조회하기 캘린더
function datePicker(){
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd'         //Input Display Format 변경 
        ,showMonthAfterYear:true     //년도 먼저 나오고, 뒤에 월 표시           
        ,yearSuffix: "년"             //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12']                     //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토']                                         //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']                 //달력의 요일 부분 Tooltip 텍스트
    });   
    $("#start_day").datepicker({  
        onClose: function(selectedDate){   
            $("#end_day").datepicker("option", "minDate", selectedDate);
        }    
    });

    $("#end_day").datepicker({         
        onClose: function(selectedDate) {    
            $("#start_day").datepicker("option", "maxDate", selectedDate);
        }    
    });  
};

//스크롤 none
function ScrollNone() {
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden";
};

//스크롤 Active
function ScrollActive() {
    document.documentElement.style.overflowY = "scroll";
};

//3자리 ,
function comma(x){
    result = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return result
}

//페이징 처리
function payPaging(datePer , maxPage , count  , GP){

    $(".pagination_box ul").html("");

    var pageCount = 5;
    var pageGroup = Math.ceil(GP/pageCount);
    
    if(maxPage > 1){
        $(".pagination_box").css("display" , "block")
    }else{
        $(".pagination_box").css("display" , "none")
    };
    
    var last = pageGroup * pageCount;

    if(last > maxPage){
        last = maxPage;
    }

    var first = last - (pageCount - 1);
    var next = last + 1;
    var prev = first -1;

    if(maxPage < 1){
        first = last;
    }

    if(prev > 0){
        var pagePrev =
        `
        <li class="page-item">
            <a id="prev" href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
        </li>
        `
        $(".pagination_box ul").prepend(pagePrev)
    }

    for(var i = first; i <= last; i++ ){

        if(GP == i){
            var pageNum =
            `
            <li class="page-item active">
                <a href="javascript: void(0);" class="page-link" data-pagenum=${i}>${i}</a>
            </li>
            `
            $(".pagination_box ul").append(pageNum);
        }else{
            var pageNum2 =
            `
            <li class="page-item">
                <a href="javascript: void(0);" class="page-link" data-pagenum=${i}>${i}</a>
            </li>
            `
            $(".pagination_box ul").append(pageNum2)
        }

    }

    if(last < maxPage){
        var pageNext =
        `
        <li class="page-item">
            <a id="next" href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
        </li>
        `
        $(".pagination_box ul").append(pageNext)
    }

    //페이징 번호 클릭 이벤트 
    $(".pagination_box ul a").click(function () {
        
        let $id = $(this).attr("id");
        let pageNum = $(this).attr("data-pagenum");

        selectedPage = pageNum

        // 다음 , 이전 버튼 그룹 재 호출
        if ($id == "next"){         
            selectedPage = next;
        }
        if ($id == "prev"){
            selectedPage = prev;
        }
        
        //전역변수에 선택한 페이지 번호를 담는다...
        GP = selectedPage;

        //페이징 재호출
        payPaging(datePer , maxPage , count  , GP);


        //상태값에 따른 페이징 리스트
        var modalVal = $(".modal_val").val();

        switch(modalVal){
            case "0" : userAll(datePer ,GP , keyWordVal); break; // 메인 //글목록 재호출
            case "1" : contestAll(datePer , GP , keyWordVal); break; // 메인 //콘테스트목록 재호출
        }
    });
};
