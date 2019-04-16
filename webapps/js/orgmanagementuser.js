var user_list = [];
var userTable = null;

var off_details = 30000;
var userroles_details= 40000;
$(document).ready(function () {

    loadorguserList();
    loadorguserroleList() 
});


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
            sTitle: 'User Name',
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
                
                    var r= '<div class="dropdown">'+
                    '<button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>'+
                    '<div class="dropdown-menu">'+
                    '<a class="dropdown-item" href="#" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', ' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ', ' + '\'' + row['address'] + '\'' + ', ' + '\'' + row['phonenumber'] + '\'' + ', ' + '\'' + row['emailid'] + '\'' + '\)"><i class="fa fa-edit"></i>  Edit</a>'+
                    '<a class="dropdown-item" href="#" onclick="del(' + '\'' + row['_id'] + '\'' + ',' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ')"><i class="fa fa-trash"></i>  Delete</a>'+
                    '<a class="dropdown-item" href="#" onclick="userrole(' + '\'' + row['userid'] + '\'' + ' ,'+ '\'' + row['username'] + '\'' + ' )"><i class="fa fa-check"></i> Organization UserRoles Modal</a>'+
                    '<a class="dropdown-item" href="/managerecord"><i class="fa fa-home"></i> Organization HomePage</a>' +
                    '<a class="dropdown-item" href="/roledetails"><i class="fa fa-link"></i> Organization Roles</a>' +
                    '<a class="dropdown-item" href="/userrolelist"> <i class="fa fa-check"></i> Organization UserRoles</a>'+
                    '</div>'+
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
        userTable = $("#orguser").DataTable(tableOption);
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
                  
                    + '<button class="btn btn-sm btn-default" onclick="del(' + '\'' + row['_id'] + '\'' + ',' + '\'' + row['userid'] + '\'' + ', ' + '\'' + row['username'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
                   
               
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


function userrole(x,y) {
    var uname = document.getElementById("useri2");
    uname.setAttribute("value", x);
    var uschool = document.getElementById("usern2");
    uschool.setAttribute("value", y);
   
    $("#Roledetails form")[0].reset();
    $("#Roledetails").modal('show');
    $("#Roledetails form").attr('onsubmit', 'userroledetails(' + '\'' + x + '\'' + ' ,'+ '\'' + y + '\'' + ' )');
}

function userroledetails(x,y) {

  
    var checked = $('#userr').val();
      
    
    var checked = [];
    $.each($("input[name='userRoles']:checked"), function () {
        
        checked.push($(this).val());

    });
    // console.log(checked)



    var details={
                 userid:x,
                 userrole:checked,
                 username:y,

                 }
  console.log(details)

         var recordId=40000;
         insertRecord(recordId, details, function(status, data){
            if (status) {
                successMsg('Record Created Successfully');
                // $("#Roledetails").modal('hide');
                loadorguserroleList();

            } else {
                errorMsg('Error in Creating Record')
                
            }

    })

  



}




function edit(id,a, b, c, d, e,y) {
   

    var uname = document.getElementById("orgi1");
         uname.setAttribute("value", a);
    var uoffice = document.getElementById("useri1");
          uoffice.setAttribute("value", b);
    var uschool = document.getElementById("usern1");
             uschool.setAttribute("value", c);
    var ucollage = document.getElementById("usera1");
               ucollage.setAttribute("value", d);
    var uroll = document.getElementById("userp1");
               uroll.setAttribute("value", e);
    var uscale = document.getElementById("usere1");
               uscale.setAttribute("value", y);
                                  
   
    
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#offical_edit").click(function () {
        var f = $("#orgi1").val();
        var g = $("#useri1").val();
        var h = $("#usern1").val();
        var i = $("#usera1").val();
        var j = $("#userp1").val();
        var k = $("#usere1").val();

       
        var name;
        var office;
        var school;
        var collage;
        var roll;
        var scale;

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


        if (i != "") {
            collage = i;
        }
        else{
            collage=d;
        }

        if (j != "") {
            roll = j;
        }
        else{
            roll=e;
        }
        
        if (k != "") {
            scale = k;
        }
        else{
            scale=y;
        }


        var obj={
            'orgid':name,
            'userid':office,
            'username':school,
            'address': collage, 
            'phonenumber': roll,
            'emailid': scale
        }


        updateRecords(30000,id, obj,function( status, data){
            if(status){
             successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
                loadorguserList();
                console.log(data)
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


function del(id,useri,usern) {
  
    deleteRecord(30000, id, function (status, data) {
        
        
        if (status) {
            del_four(useri);
            successMsg('Record Deleted Successfully');
            loadorguserroleList() 
            
        }
    })
       tableOption['data']=resData;


}

   function del_four(useri){
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
         
            for(i=0;i<resultData.length;i++){
                // console.log(resultData[i]['_source']['userid'])
                if(resultData[i]['_source']['userid']==useri){
                   deleteuserrole(40000, resultData[i]['_id'])
                }
            }

          
        }

    })
   }    


   function deleteuserrole(rid, _id){
    
    
    deleteRecord(rid, _id, function(status, data){
        if(status){
            
        }
    })
}