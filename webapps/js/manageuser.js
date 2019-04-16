

var user_list = [];
var userTable = null;
var org_details  = 10000;
var role_details = 20000;
var user_details = 30000;
var off_details  = 40000;
$(document).ready(function () {
    $(".leftMenu").removeClass('active')
    $(".records").addClass('active')
    loadorgmanagementList();
    loadorganizationroleList();
    loadorguserList();
    loadorguserroleList()

});
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
                    '<a class="dropdown-item" href="#" onclick="Modal(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')"><i class="fa fa-link"></i> Organization RolesModal</a>' +
                    '<a class="dropdown-item" href="/roledetails"><i class="fa fa-link"></i>Organization Roles</a>' +
                    '<a class="dropdown-item" href="#" onclick="user(' + '\'' + row['orgid'] + '\'' + ',' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ')"><i class="fa fa-bars"></i> Organization UsersListModal</a>' +
                    '<a class="dropdown-item" href="/userdetails"><i class="fa fa-bars"></i>Organization UsersList</a>' +
                    '<a class="dropdown-item" href="/userrolelist"> <i class="fa fa-check"></i>Organization UserRoles</a>' +
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
            // data : _.pluck(records, '_source')
        }

        $(".eventCount").html(totalRecords)


        return resultObj;

    } else {

        return resultObj;

    }

}

function openModal() {
    $("#Adddetails form")[0].reset();
    $("#Adddetails").modal('show');
    $("#Adddetails form").attr('onsubmit', 'adddetails()');

}

function adddetails() {

    var oi = $("#orgi").val();
    var on = $("#orgn").val();
    var od = $("#orgd").val();
    var oa = $("#orga").val();
    var op = $("#orgp").val();
    var oe = $("#orge").val();



    var details = {
        orgid: oi,
        name: on,
        description: od,
        address: oa,
        phonenumber: op,
        emailid: oe
    }

    var recordId = 10000;
    insertRecord(recordId, details, function (status, data) {
        if (status) {
            successMsg('Record Created Successfully');
            $("#Adddetails").modal('hide');
            loadorgmanagementList();

        } else {
            errorMsg('Error in Creating Record')
            console.log(data)
        }

    })
   
}




// function loadorganizationroleList() {



//     if (userTable) {
//         userTable.destroy();
//         $("#orgroles").html("");
//     }

//     var fields = [
//         {
//             mData: 'orgid',
//             sTitle: 'Organization ID',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }
//         },
//         {
//             mData: 'roleid',
//             sTitle: 'ID',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }

//         },
//         {
//             mData: 'description',
//             sTitle: 'Descisrption',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }
//         },




//         {
//             mData: '',
//             sTitle: 'Action',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 var r = '<button class="btn btn-sm btn-default" onclick="edit1(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['roleid'] + '\'' + ', ' + '\'' + row['description'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'

//                     + '<button class="btn btn-sm btn-default" onclick="del1(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
//                 return data ? data : r;

//             }
//         }


//     ];

//     var tableOption = {
//         fixedHeader: {
//             header: true,
//             headerOffset: -5
//         },
//         responsive: true,
//         paging: true,
//         searching: true,
//         "ordering": true,
//         iDisplayLength: 10,
//         lengthMenu: [[10, 50, 100], [10, 50, 100]],
//         aoColumns: fields,
//         data: []
//     };

//     var queryParams = {
//         "query": {
//             "bool": {
//                 "must": [{
//                     match: { domainKey: DOMAIN_KEY }
//                 }
//                 ]
//             }
//         },
//         "size": 1000,
//         sort: {
//             // 'createdtime': {'order': 'desc'}
//         }
//     };
//     var searchQuery = {
//         "method": 'GET',
//         "extraPath": "",
//         "query": JSON.stringify(queryParams),
//         "params": []
//     };
//     searchByQuery(role_details, 'RECORD', searchQuery, function (status, data) {
//         if (status) {

//             var resultData = searchQueryFormatter(data).data;
//             var resData = resultData['data'];
//             tableOption['data'] = resData;






//         } else {
//         }
//         userTable = $("#orgroles").DataTable(tableOption);
//     });
// }




// function role(id, t) {

    
   
//     var uname = document.getElementById("orgi2");
//     uname.setAttribute("value", t);
   
  
  
    
//     $("#Enterdetails form")[0].reset();
//     $("#Enterdetails").modal('show');
//     $("#Enterdetails form").attr('onsubmit', 'roledetails(' + '\'' + t + '\'' + ')');

    

// }

// function roledetails(t) {
    
    
//     var ri = $('#rid').val();
//     var dp = $('#des').val();



//     var details = {
//         orgid: t,
//         roleid: ri,
//         description: dp
//     }


//     var recordId = 20000;
//     insertRecord(recordId, details, function (status, data) {
//         if (status) {
//             successMsg('Record Created Successfully');
//             //  $("#Enterdetails").modal('hide');
//             loadorganizationroleList();

//         } else {
//             errorMsg('Error in Creating Record')
           
//         }

//     })
    
// }


function loadorguserList() {



    if (userTable) {
        userTable.destroy();
        $("#orguser").html("");
    }

    var fields = [
        {
            mData: 'orgid',
            sTitle: 'Organization Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'userid',
            sTitle: 'User Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        {
            mData: 'username',
            sTitle: 'UserName',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'address',
            sTitle: 'Address',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'phonenumber',
            sTitle: 'Phone Number',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'emailid',
            sTitle: 'EmailId',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },



        {
            mData: '',
            sTitle: 'Action',
            orderable: false,
            mRender: function (data, type, row) {
                var r = '<button class="btn btn-sm btn-default" onclick="edit2(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ', ' + '\'' + row['address'] + '\'' + ', ' + '\'' + row['phonenumber'] + '\'' + ', ' + '\'' + row['emailid'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                   
                    + '<button class="btn btn-sm btn-default" onclick="del2(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
                return data ? data : r;
                return data;
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
    searchByQuery(user_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

            var resultData = searchQueryFormatter(data).data;
            var resData = resultData['data'];
            tableOption['data'] = resData;



            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#orguser").DataTable(tableOption);
    });
}
function user(s) {
    var uname = document.getElementById("orgi3");
    uname.setAttribute("value", s);
  



    $("#Enteruserdetails form")[0].reset();
    $("#Enteruserdetails").modal('show');
    $("#Enteruserdetails form").attr('onsubmit', 'userdetails(' + '\'' + s + '\'' + ')');
}
function userdetails(s) {
   
    var ui = $('#useri').val();
    var un = $('#usern').val();
    var ua = $('#usera').val();
    var up = $('#userp').val();
    var ue = $('#usere').val();


    var details = {
        orgid: s,
        userid: ui,
        username: un,
        address: ua,
        phonenumber: up,
        emailid: ue
    }
          

    var recordId = 30000;
    insertRecord(recordId, details, function (status, data) {
        if (status) {
            successMsg('Record Created Successfully');
           
            loadorguserList();

        } else {
            errorMsg('Error in Creating Record')
          
        }

    })

    



}

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
                    '<a class="dropdown-item" href="#" onclick="edit3(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['userrole'] + '\'' + ', ' + '\'' + row['username'] + '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick="del3(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
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






function edit(i, a, b, c, d, e, y) {
   
    var uname = document.getElementById("orgi1");
         uname.setAttribute("value", a);
    var uoffice = document.getElementById("orgn1");
               uoffice.setAttribute("value", b);
   var uschool = document.getElementById("orgd1");
               uschool.setAttribute("value", c);
    var ucollage = document.getElementById("orga1");
               ucollage.setAttribute("value", d);
    var uroll = document.getElementById("orgp1");
               uroll.setAttribute("value", e);
    var uscale = document.getElementById("orge1");
               uscale.setAttribute("value", y);
                                   
                        
                       
   

    $("#Editdetails form")[0].reset();


    $("#Editdetails").modal('show');
    $("#organization_edit").click(function () {
        var f = $("#orgi1").val();
        var g = $("#orgn1").val();
        var h = $("#orgd1").val();
        var j = $("#orga1").val();
        var k = $("#orgp1").val();
        var l = $("#orge1").val();



        var name;
        var office;
        var school;
        var collage;
        var roll;
        var scale;

        if (f != "") {
            name = f;
        }
        else {
            name = a;
        }
        if (g != "") {
            office = g;
        }
        else {
            office = b;
        }
        if (h != "") {
            school = h;
        }
        else {
            school = c;
        }


        if (j != "") {
            collage = j;
        }
        else {
            collage = d;
        }
        if (k != "") {
            roll = k;
        }
        else {
            roll = e;
        }
        if (l != "") {
            scale = l;
        }
        else {
            scale = y;
        }





        var obj = {

            'orgid': name,
            'name': office,
            'description': school,
            'address': collage,
            'phonenumber': roll,
            'emailid': scale
        }




        updateRecords(10000,i, obj,function( status, data){
            if(status){
             successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
              loadorgmanagementList();
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


function del(id, org) {
   
    deleteRecord(10000, id, function (status, data) {
        
        
        if (status) {
            
          
            del_second(org);
            del_char(org);
            successMsg('All Record Deleted Successfully');
            loadorgmanagementList();
            
        }
    })
       tableOption['data']=resData;

}

function del_second(org) {
    var queryParams = {
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
    searchByQuery(20000,'RECORD', searchQuery,  function(status, data){
        if(status){
          
            var result=JSON.parse(data.result);
            
            var resultData=result.hits.hits;
         
            for(i=0;i<resultData.length;i++){
                // console.log(resultData[i]['_source']['orgid'])
                if(resultData[i]['_source']['orgid']==org){
                   deleteIt(20000, resultData[i]['_id'])
                }
            }

          
        }

    } )
}



function deleteIt(rid, _id){
    deleteRecord(rid, _id, function(status, data){
        if(status){
          
        }
    })
}





function del_char(org) {
    var queryParams = {
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
    searchByQuery(30000,'RECORD', searchQuery,  function(status, data){
        if(status){
          
            var result=JSON.parse(data.result);
            
            var resultData=result.hits.hits;
           
            for(i=0;i<resultData.length;i++){
               
                if(resultData[i]['_source']['orgid']==org){
                    var userid;
                   deleteIn(30000, resultData[i]['_id'])
                //    console.log(resultData[i]['_source'])
                
                //    console.log(resultData[i])
               
                   del_four(resultData[i]['_source']['userid']);
               }

            }

          
        }

    })
    
}



function deleteIn(rid, _id){
    deleteRecord(rid, _id, function(status, data){
       
     if(status){
          
            
        }
    })
}



function del_four(useri) {
    
    var queryParams = {
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


    searchByQuery(40000,'RECORD', searchQuery,  function(status, data){
        
        if(status){
            
           
            var result=JSON.parse(data.result);
            var resultData=result.hits.hits;
      

            for(i=0; i<resultData.length; i++){  
         
           
                

              
                
                if(resultData[i]['_source']['userid'] == useri){
                  
                    console.log(resultData[i]['_source']['userid'])
                    
                    deleterole1(40000,resultData[i]['_id'])
                   
                   
                }

            }

        }else{
            console.log("something went wrong")
        }
    })
}


function deleterole1(rid, _id){
 
    
    deleteRecord(rid, _id, function(status, data){
        if(status){
            
        }
    })
}




// ****************************Organization roles.js*****************************//        




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
                    '<a class="dropdown-item" href="#" onclick="edit1(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['roleid'] + '\'' + ', ' + '\'' + row['description'] +  '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
                    '<a class="dropdown-item" href="#" onclick="del1(' + '\'' + row['_id'] + '\'' + ',' + '\'' + row['roleid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
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


// function loadorgmanagementList() {


//     if (userTable) {
//         userTable.destroy();
//         $("#orgmanagement1").html("");
//     }

//     var fields = [
//         {
//             mData: 'orgid',
//             sTitle: 'Organization ID',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }
//         },
//         {
//             mData: 'name',
//             sTitle: 'Organization Name',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }

//         },
//         {
//             mData: 'description',
//             sTitle: 'Description',
//             orderable: false,
//             mRender: function (data, type, row) {
//                 return data ? data : "-";

//             }
//         },
//         {
//             mData: 'address',
//             sTitle: 'Organization Address',
//             orderable: false,
//             mRender: function (data, type, row) {

//                 return data ? data : "-";

//             }
//         },
//         {
//             mData: 'phonenumber',
//             sTitle: 'Phone Number',
//             orderable: false,
//             mRender: function (data, type, row) {

//                 return data ? data : "-";

//             }
//         },
//         {
//             mData: 'emailid',
//             sTitle: 'Email Id',
//             orderable: false,
//             mRender: function (data, type, row) {

//                 return data ? data : "-";

//             }
//         },

//         {
//             mData: 'action',
//             sTitle: 'Action',
//             orderable: false,
//             mRender: function (data, type, row) {

//                   var r = '<div class="dropdown">' +
//                     '<button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' +
//                     '<div class="dropdown-menu">' +
//                     '<a class="dropdown-item" href="#" onclick="edit(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['name'] + '\'' + ',' + '\'' + row['description'] + '\'' + ',' + '\'' + row['address'] + '\'' + ', ' + '\'' + row['phonenumber'] + '\'' + ', ' + '\'' + row['emailid'] + '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>' +
//                     '<a class="dropdown-item" href="#" onclick="del(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>' +
//                     '<a class="dropdown-item"  onclick="role(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ')" href="#"><i class="fa fa-link"></i> Organization RolesModal</a>' +
//                     // '<a class="dropdown-item" href="/roledetails"><i class="fa fa-link"></i> Organization Roles</a>' +
//                     '<a class="dropdown-item" href="#" onclick="user(' + '\'' + row['orgid'] + '\'' + ',' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ')"><i class="fa fa-bars"></i> Organization UsersListModal</a>' +
//                     // '<a class="dropdown-item" href="/userdetails"><i class="fa fa-bars"></i> Organization UsersList</a>' +
//                     '<a class="dropdown-item" href="/userrolelist"> <i class="fa fa-check"></i> Organization UserRoles</a>' +
//                     '</div>' +
//                     '</div>'



//                 return data ? data : r;

//             }
//         },

//     ];




//     var tableOption = {
//         fixedHeader: {
//             header: true,
//             headerOffset: -5
//         },
//         responsive: true,
//         paging: true,
//         searching: true,
//         "ordering": true,
//         iDisplayLength: 10,
//         lengthMenu: [[10, 50, 100], [10, 50, 100]],
//         aoColumns: fields,
//         data: []
//     };

//     var queryParams = {
//         "query": {
//             "bool": {
//                 "must": [{
//                     match: { domainKey: DOMAIN_KEY }
//                 }
//                 ]
//             }
//         },
//         "size": 1000,
//         sort: {

//         }
//     };
//     var searchQuery = {
//         "method": 'GET',
//         "extraPath": "",
//         "query": JSON.stringify(queryParams),
//         "params": []
//     };
//     searchByQuery(org_details, 'RECORD', searchQuery, function (status, data) {
//         if (status) {

//             var resultData = searchQueryFormatter(data).data;
//             var resData = resultData['data'];
//             tableOption['data'] = resData;






//         } else {
//         }
//         userTable = $("#orgmanagement1").DataTable(tableOption);
//     });
// }



// function onModal(id,t){

function Modal(id, t) {

    console.log(id,t)
   
    // var uname = document.getElementById("orgi2");
    // uname.setAttribute("value", t);
   
  
  
    
    $("#Enterdetails form")[0].reset();
    $("#Enterdetails").modal('show');
    $("#Enterdetails form").attr('onsubmit', 'roledetails(' + '\'' + t + '\'' + ')');

      

}



    
    function roledetails(t) {
        console.log(t)
        // var oi = $('#orgi2').val();
        var ri = $('#rid').val();
        var dp = $('#des').val();
    
    
    
        var details = {
            orgid: t,
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



function edit1(id,a, b, c) {
   
   
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


function del1(id,rolei) {
   
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

