
$(function(){
    faqList()
})

// 자주 묻는 질문 리스트  
function faqList(target){
    var typeVal = $(target).val();

    $.ajax({
        url: `https://api.videocon.io/api/v1/notice/questions?page=${1}&type=${(typeVal == "" || typeof typeVal == "undefined") ? 0 : typeVal}`,
        method : 'GET',
        success: function(data){
            $(".faq_listbox").html("");

            if(data.length >= 1){
                data.map( x => {
                    var contlist = 
                        `
                        <tr>
                            <td><a href="javascript: void(0);" class="text-body fw-bold">${x.idx}</a></td>
                            <td>
                            <select id="faq_type2" class="faq_type2" data-rel="${x.type}">
                                <option value="0">기타</option>
                                <option value="1">클라이언트</option>
                                <option value="2">아트레이터</option>
                            </select>
                            </td>
                            <td><input class="faq_title" type="text" value="${x.title}"></td>
                            <td><textarea class="faq_content${x.idx}">${x.content}</textarea></em></td>
                            <td><span class="font-size-14">${x.date}</span></td>
                            <td><span class="badge badge-pill badge-soft-success font-size-16 pa_status">
                                <a onclick=faqModify(this,${x.idx}); href="javascript:;">수정하기</a>
                            </td>
                            <td><span class="badge badge-pill badge-soft-success font-size-16 del_status">
                                <a onclick=faqDelete(${x.idx}); href="javascript:;">삭제하기</a>
                            </td>
                        </tr>
                        `
                    $(".faq_listbox").append(contlist);
                    
                    $(`.faq_content${x.idx}`).summernote({
                        width : 700,
                        height: 200,
                        lang: "ko-KR"
                    });
                });

                $(".faq_type2").each(function(){
                    var rel = $(this).attr("data-rel");
                    $(this).find(`option[value="${rel}"]`).attr("selected" , "selected");
                })

            }else{

            }

        },error:function(err){
            console.log(err)
        }
    });
};

// 자주 묻는 질문 업로드
function faqSubmit(){

    $.ajax({
        url: `${E}/api/v1/admin/question/add`,
        method : 'POST',
        data : {
            title : $("#faq_title").val(),
            content : $(".note2").val(),
            type : $("#faq_type option:selected").val(),
        },
        success: function(data){
            alert("업로드 성공");
            location.reload();

        },error:function(err){
            console.log(err)
            alert("실패")
        }
    });
};

// 자주 묻는 질문 수정
function faqModify(target , idx){

    var faqContent = $(target).closest("tr").find("textarea").val();
    var faqTitle = $(target).closest("tr").find(".faq_title").val();
    var faqType = $(target).closest("tr").find("select").val();
    var result = confirm("수정 YES OR NO")

    if(result){
        $.ajax({
            url: `${E}/api/v1/admin/question/${idx}`,
            method : 'PATCH',
            data : {
                title : faqTitle,
                content : faqContent,
                type : faqType
            },
            success: function(data){
                alert("수정이 완료되었습니다")
                location.reload();
    
            },error:function(err){
                console.log(err)
                alert("실패")
            }
        });
    }else{

    }
};

// 자주 묻는 질문 삭제
function faqDelete(idx){

    var result = confirm("삭제 YES OR NO")

    if(result){
        $.ajax({
            url: `${E}/api/v1/admin/question/${idx}`,
            method : 'DELETE',
            success: function(data){
                alert("삭제가 완료되었습니다")
                location.reload();
    
            },error:function(err){
                console.log(err)
                alert("실패")
            }
        });

    }else{
        
    }
};
