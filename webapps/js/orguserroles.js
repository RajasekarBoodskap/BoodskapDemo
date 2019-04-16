var user_list = [];
var userTable = null;

var off_details = 40000;
$(document).ready(function () {

    loadorguserroleList();

});


function loadorguserroleList() {



    if (userTable) {
        userTable.destroy();
        $("#orguserrole").html("");
    }

    var fields = [
        {
            mData: 'userid',
            sTitle: 'User Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                
            }
        },
       
        {
            mData: 'username',
            sTitle: 'User Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
               
            }
        },
        {
            mData: 'userrole',
            sTitle: 'User Roles',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
               
            }
        },
       



        {
            mData: 'action',
            sTitle: 'Action',
            orderable: false,
            mRender: function (data, type, row) {
                var r = '<button class="btn btn-sm btn-default" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['userrole'] + '\'' + ', ' + '\'' + row['username'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                  
                    + '<button class="btn btn-sm btn-default" onclick="del(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
                   
                    var r = '<div class="dropdown">' +
                    '<button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item" href="#" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['userrole'] + '\'' + ', ' + '\'' + row['username'] + '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick="del(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
                    '<a class="dropdown-item" href="/managerecord"> <i class="fa fa-home"></i> Organization HomePage</a>' +
                    '<a class="dropdown-item" href="/roledetails"><i class="fa fa-link"></i> Organization Roles</a>' +
                    '<a class="dropdown-item" href="/userdetails"><i class="fa fa-bars"></i> Organization UsersList</a>' +
                  
                    '</div>' +
                    '</div>'

                    return data ? data : r;
              
            }
        }


    ];



    var tableOption = {
        fixedHeader: {
            header: true,
            headerOffset: -5
        },
        responsive: true,
        paging: true,
        searching: true,
        "ordering": true,
        iDisplayLength: 10,
        lengthMenu: [[10, 50, 100], [10, 50, 100]],
        aoColumns: fields,
        data: []
    };

    var queryParams = {
        "query": {
            "bool": {
                "must": [{
                    match: { domainKey: DOMAIN_KEY }
                }
                ]
            }
        },
        "size": 1000,
        sort: {
            // 'createdtime': {'order': 'desc'}
        }
    };
    var searchQuery = {
        "method": 'GET',
        "extraPath": "",
        "query": JSON.stringify(queryParams),
        "params": []
    };
    searchByQuery(off_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

            var resultData = searchQueryFormatter(data).data;
            var resData = resultData['data'];
            tableOption['data'] = resData;



            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#orguserrole").DataTable(tableOption);
    });
}



function searchQueryFormatter(data) {

    var resultObj = {
        total: 0,
        data: {},
        aggregations: {}
    }

    if (data.httpCode === 200) {

        var arrayData = JSON.parse(data.result);

        var totalRecords = arrayData.hits.total;
        var records = arrayData.hits.hits;

        var aggregations = arrayData.aggregations ? arrayData.aggregations : {};


        for (var i = 0; i < records.length; i++) {
            records[i]['_source']['_id'] = records[i]['_id'];
        }

        resultObj = {
            "total": totalRecords,
            "data": {
                "recordsTotal": totalRecords,
                "recordsFiltered": totalRecords,
                "data": _.pluck(records, '_source')
            },
            aggregations: aggregations
          
        }

        $(".eventCount").html(totalRecords)


        return resultObj;

    } else {

        return resultObj;
    }

}








function edit(id,a, b, c) {
  
console.log("userid is "+ a);
console.log("username is "+c);
console.log("userrole is "+b)


var userid = document.getElementById("useri1");
    userid.setAttribute("value", a);
var uname = document.getElementById("usern1");
    uname.setAttribute("value", c);

    var uname = document.getElementById("userr1");
    uname.setAttribute("checked", b);
    $(":checkbox[value=" + b + " ]").attr("checked","true");




    
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#offical_edit").click(function () {

        

        var checked = [];
        $.each($("input[name='userRoles']:checked"), function () {
            checked.push($(this).val());

         });
      

     
        var f = $("#useri1").val();
      
        var h = $("#usern1").val();


       
        
       
        var name1;
        var role;
        var school;
        

        if (f != "") {
            name1 = f;
        }
        else{
            name1=a;
        }
        if (checked != "") {
            role =checked;
        }
        else{
            role=b;
        }
        if (h != "") {
            school = h;
        }
        else{
            school=c;
        }

        

        var obj={
            'userid':name1,
            'userrole':role,
            'username':school
        }
           


        updateRecords(40000,id, obj,function( status, data){
            if(status){
             successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
                loadorguserroleList();
               
            }
            else{
                errorMsg('Error in Updated Record')
            }
        } )
          
    })


}
   
function updateRecords(rid, rkey, obj, cbk){
    $.ajax({
        url: API_BASE_PATH + "/record/insert/static/" + API_TOKEN + '/' + rid + '/' + rkey,
        data: JSON.stringify(obj),
        contentType: "text/plain",
        type: 'POST',
        success: function (data) {
            cbk(true,data)
        },
        error: function (e) {
            cbk(false,e)
        }
       
    });
}


function del(id) {
   
    $.ajax({
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 40000 + '/' + id,
        type: 'DELETE',
        success: function (data) {
          
            successMsg('Record Deleted Successfully');
            loadorguserroleList();
        },
        error: function (e) {
            errorMsg('Error in Record Delete')
        }
    });

}

       