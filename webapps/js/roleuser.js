var user_list = [];
var userTable = null;

var org_details = 10000;
var off_details = 20000;
$(document).ready(function () {
    loadorgmanagementList()
    loadorganizationroleList();

});


function loadorganizationroleList() {



    if (userTable) {
        userTable.destroy();
        $("#orgroles").html("");
    }

    var fields = [
        {
            mData: 'orgid',
            sTitle: 'Organization ID',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
               
            }
        },
        {
            mData: 'roleid',
            sTitle: 'ID',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
               
            }

        },
        {
            mData: 'description',
            sTitle: 'Descisrption',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
               
            }
        },
        



        {
            mData: '',
            sTitle: 'Action',
            orderable: false,
            mRender: function (data, type, row) {
               
                    var r = '<div class="dropdown">' +
                    '<button class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item" href="#" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['roleid'] + '\'' + ', ' + '\'' + row['description'] +  '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick="del(' + '\'' + row['_id'] + '\'' + ',' + '\'' + row['roleid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
                   '<a class="dropdown-item" href="/managerecord"><i class="fa fa-home"></i> Organization HomePage</a>' +
                    '<a class="dropdown-item" href="/userdetails"><i class="fa fa-bars"></i> Organization UsersList</a>' +
                    '<a class="dropdown-item" href="/userrolelist"> <i class="fa fa-check"></i> Organization UserRoles</a>' +
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



           


        } else {
        }
        userTable = $("#orgroles").DataTable(tableOption);
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


function loadorgmanagementList() {


    if (userTable) {
        userTable.destroy();
        $("#orgmanagement1").html("");
    }

    var fields = [
        {
            mData: 'orgid',
            sTitle: 'Organization ID',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";

            }
        },
        {
            mData: 'name',
            sTitle: 'Organization Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";

            }

        },
        {
            mData: 'description',
            sTitle: 'Description',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";

            }
        },
        {
            mData: 'address',
            sTitle: 'Organization Address',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";

            }
        },
        {
            mData: 'phonenumber',
            sTitle: 'Phone Number',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";

            }
        },
        {
            mData: 'emailid',
            sTitle: 'Email Id',
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

                  var r = '<div class="dropdown">' +
                    '<button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item" href="#" onclick="edit(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['name'] + '\'' + ',' + '\'' + row['description'] + '\'' + ',' + '\'' + row['address'] + '\'' + ', ' + '\'' + row['phonenumber'] + '\'' + ', ' + '\'' + row['emailid'] + '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick="del(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
                    '<a class="dropdown-item"  onclick="role(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')" href="#"><i class="fa fa-link"></i> Organization RolesModal</a>' +
                    // '<a class="dropdown-item" href="/roledetails"><i class="fa fa-link"></i> Organization Roles</a>' +
                    '<a class="dropdown-item" href="#" onclick="user(' + '\'' + row['orgid'] + '\'' + ',' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ')"><i class="fa fa-bars"></i> Organization UsersListModal</a>' +
                    // '<a class="dropdown-item" href="/userdetails"><i class="fa fa-bars"></i> Organization UsersList</a>' +
                    '<a class="dropdown-item" href="/userrolelist"> <i class="fa fa-check"></i> Organization UserRoles</a>' +
                    '</div>' +
                    '</div>'



                return data ? data : r;

            }
        },

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

        }
    };
    var searchQuery = {
        "method": 'GET',
        "extraPath": "",
        "query": JSON.stringify(queryParams),
        "params": []
    };
    searchByQuery(org_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

            var resultData = searchQueryFormatter(data).data;
            var resData = resultData['data'];
            tableOption['data'] = resData;






        } else {
        }
        userTable = $("#orgmanagement1").DataTable(tableOption);
    });
}


function role(id, t) {

    
   
    var uname = document.getElementById("orgi2");
    uname.setAttribute("value", t);
   
  
  
    
    // $("#Enterdetails form")[0].reset();
    // $("#Enterdetails").modal('show');
    // $("#Enterdetails form").attr('onsubmit', 'roledetails(' + '\'' + t + '\'' + ')');

    onModal(id,t);

}     



function onModal(){
       
    
   
       
        $("#Enterdetails form")[0].reset();
        $("#Enterdetails").modal('show');
        $("#Enterdetails form").attr('onsubmit', 'roledetails()');
    
        
     
    
    }
    
    function roledetails() {
        
        var oi = $('#orgi2').val();
        var ri = $('#rid').val();
        var dp = $('#des').val();
    
    
    
        var details = {
            orgid: oi,
            roleid: ri,
            description: dp
        }
    
    
        var recordId = 20000;
        insertRecord(recordId, details, function (status, data) {
            if (status) {
                successMsg('Record Created Successfully');
                 $("#Enterdetails").modal('hide');
                loadorganizationroleList();
    
            } else {
                errorMsg('Error in Creating Record')
               
            }
    
        })
    
}    



function edit(id,a, b, c) {
   
   
    var uname = document.getElementById("orgi1");
           uname.setAttribute("value", a);
    var uoffice = document.getElementById("rid1");
          uoffice.setAttribute("value", b);
    var uschool = document.getElementById("des1");
               uschool.setAttribute("value", c);
              
   
    
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#offical_edit").click(function () {
       
       
       
        var f = $("#orgi1").val();
        var g = $("#rid1").val();
        var h = $("#des1").val();
       

       
        var name;
        var office;
        var school;
        

        if (f != "") {
            name = f;
        }
        else{
            name=a;
        }
        if (g != "") {
            office = g;
        }
        else{
            office=b;
        }
        if (h != "") {
            school = h;
        }
        else{
            school=c;
        }


        

       

        var obj={
            'orgid':name,
            'roleid':office,
            'description':school
            
        }
        console.log(obj)

        updateRecords(20000,id, obj,function( status, data){
            if(status){
             successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
                loadorganizationroleList();
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


function del(id,rolei) {
   
    deleteRecord(20000, id, function(status, data){
        if(status){
            
           
            del_orgrole(rolei)
            successMsg('Record Deleted Successfully');
            loadorganizationroleList();
        }
    })
   
}


function del_orgrole(rolei){
 var queryParams={
     "query": {
         "bool": {
            "must": [{
                match: { domainKey: DOMAIN_KEY }
            }
            ]
         }
     },
     
     "size": 1000

 };
 var searchQuery = {
    "method": 'GET',
    "extraPath": "",
    "query": JSON.stringify(queryParams),
    "params": []
 };
  searchByQuery(40000, 'RECORD', searchQuery, function(status, data){
   if(status){
   
    var result=JSON.parse(data.result);
    
    var resultData=result.hits.hits;
    // console.log(resultData);
    for(i=0;i<resultData.length;i++){
       
        // console.log(resultData[i]['_source'])
       if(resultData[i]['_source']['userrole']==rolei){
           deleteorgrole(40000, resultData[i]['_id'])
        }
   
    }
  
}
  
})

}


function deleteorgrole(rid, _id){
    deleteRecord(rid, _id, function(status,data){
        if(status){
            
        }
    })
}

