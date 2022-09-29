$(function(){
    eventList()
})

function eventList(){
    $.ajax({
        url: `${E}/api/v1/admin/question/counsel`,
        method : 'GET',
        success: function(x){

            console.log(x)
            
            //테이블 초기화
            $(".event_box").html("");

            x.map(x => {
                var eventList =
                `
                <tr>
                    <td>
                        <div class="avatar-xs">
                            <span class="avatar-title rounded-circle">${x.idx}</span>
                        </div>
                    </td>
                    <td>
                        <h5 class="font-size-14 mb-1">
                            <a href="javascript: void(0);" class="text-dark">${x.companyName}</a>
                        </h5>
                    </td>
                    <td>
                        <div>
                            <a href="javascript: void(0);" class="badge badge-soft-primary font-size-14 m-1">${(x.managerName)}</a>
                        </div>
                    </td>
                    <td>${x.phone}</td>
                    <td>${x.email}</td>
                    <td>
                        <a href="javascript: void(0);" title="Message">${x.content}</a>
                    </td>
                </tr>
                ` 

                $(".event_box").append(eventList)
            });
        
        },error:function(err){
            console.log(err)
        }
    })
}