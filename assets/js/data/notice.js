// 공지사항 리스트 
$(function(){
    noticeList()
})

function noticeList(){
    $.ajax({
        url: `https://api.videocon.io/api/v1/notice?page=${1}`,
        method : 'GET',
        success: function(data){

            if(data.length >= 1){
                data.map( x => {
                    var contlist = 
                        `
                        <tr>
                            <td><a href="javascript: void(0);" class="text-body fw-bold">${x.idx}</a> </td>
                            <td><input class="notice_title" type="text" value="${x.title}"></td>
                            <td><textarea class="noti_content${x.idx}">${x.content}</textarea></td>
                            <td><span class="font-size-14">${x.date}</span></td>
                            <td><span class="badge badge-pill badge-soft-success font-size-16 pa_status">
                                <a onclick=notiModify(this,${x.idx}); href="javascript:;">수정하기</a>
                            </td>
                            <td><span class="badge badge-pill badge-soft-success font-size-16 del_status">
                                <a onclick=notiDelete(${x.idx}); href="javascript:;">삭제하기</a>
                            </td>
                        </tr>
                        `
                    $(".notice_listbox").append(contlist);
                    
                    $(`.noti_content${x.idx}`).summernote({
                        width : 700,
                        height: 200,
                        lang: "ko-KR"
                    });
                });

            }else{

            }
        },error:function(err){
            console.log(err)
        }
    });
}

// 공지사항 업로드
function notiSubmit(){

    $.ajax({
        url: `${E}/api/v1/admin/notice/add`,
        method : 'POST',
        data : {
            title : $("#noti_title").val(),
            content : $(".note1").val()
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

// 공지사항 수정
function notiModify(target , idx){

    var notiContent = $(target).closest("tr").find("textarea").val();
    var notiTitle = $(target).closest("tr").find(".notice_title").val();

    var result = confirm("수정 YES OR NO")

    if(result){
        $.ajax({
            url: `${E}/api/v1/admin/notice/${idx}`,
            method : 'PATCH',
            data : {
                title : notiTitle,
                content : notiContent
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

// 공지사항 삭제
function notiDelete(idx){

    var result = confirm("삭제 YES OR NO")

    if(result){
        $.ajax({
            url: `${E}/api/v1/admin/notice/${idx}`,
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
