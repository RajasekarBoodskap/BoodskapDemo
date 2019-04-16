var user_list = [];
var userTable = null;

var org_details = 4000;
$(document).ready(function () {
    $(".leftMenu").removeClass('active')
    $(".records").addClass('active')
    loadorgdataList();

});


function loadorgdataList() {


    if (userTable) {
        userTable.destroy();
        $("#datatable").html("");
    }

    var fields = [
        {
            mData: 'orgid',
            sTitle: 'ID',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'fullname',
            sTitle: 'Full Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        // {
        //     mData: 'role',
        //     sTitle: 'Role',
        //     orderable: false,
        //     mRender: function (data, type, row) {
        //         return data ? data : "-";
        //         return data;
        //     }
        // },
        {
            mData: 'phone',
            sTitle: 'Phone',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        // {
        //     mData: 'timezone',
        //     sTitle: 'Timezone',
        //     orderable: false,
        //     mRender: function (data, type, row) {

        //         return data ? data : "-";
        //         return data;
        //     }
        // },

        {
            mData: 'action',
            sTitle: 'Action',
            orderable: false,
            mRender: function (data, type, row) {
                 
// var r='<a href="#" onclick="me(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + data[i]['device'] + '\'' +'\)"><i class="fa fa-times"></i></a>'
 var r= 
//  '<a href="#" onclick="edit(' + '\'' + row['orgname'] + '\'' + ', '+  '\'' + row['orgplace'] + '\'' +','+  '\'' + row['orgposition'] + '\'' +','+'\'' + row['orgbranches'] + '\'' +'\)"><i class="fa fa-edit"></i></a>' 
//  + '<a href="#" onclick="del(' + '\'' + row["_id"] + '\'' + ')"><i class="fa fa-trash"></i></a>'
'<button class="btn btn-sm btn-icon btn-default" onclick="edit(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['orgid'] + '\'' + ', '+  '\'' + row['orgname'] + '\'' +','+ '\'' + row['phone'] + '\'' +'\)"><i class="fa fa-edit"></i></button>' 
 + '<button class="btn btn-sm btn-icon btn-default" onclick="del(' + '\'' + row["_id"] + '\'' + ')"><i class="fa fa-trash"></i></button>'


                return data ? data : r;
               
                return data;
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
            // 'createdtime': {'order': 'desc'}
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

          var resultData=searchQueryFormatter(data).data;
          var resData=resultData['data'];
          tableOption['data']=resData;
          


            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#datatable").DataTable(tableOption);
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


function edit(idd,a,b,d) {
    console.log(idd,a,b,d);
   
    
    $("#editEmployeeModal form")[0].reset();
   

    $("#editEmployeeModal").modal('show');
    $("#organization_edit").click(function () {
        var f = $("#id1").val();
        var g = $("#name1").val();
        // var h = $("#role1").val();
        var i = $("#phn1").val();
        // var j = $("#sel1").val();
      

       
        var name;
        var office;
        var school;
        var collage;
        var roll;

        if (f!= "") {
            name =f;
        }
        else{
            name=a;
        }
        if (g!= "") {
            office =g;
        }
        else{
            office=b;
        }
        // if (h!= "") {
        //     school =h;
        // }
        // else{
        //     school=c;
        // }


        if (i!= "") {
            collage =i;
        }
        else{
            collage=d;
        }
        // if (j!= "") {
        //     roll =j;
        // }
        // else{
        //     roll=e;
        // }

       



        var obj={
           
            'orgid':name,
            'fullname':office,
            // 'role':school,
            'phone': collage,
            // 'timezone': collage 
     }
     console.log(obj);

     updateRecords(4000, idd, obj, function( status, data){
        if(status){
            successMsg('Record Updated Successfully');
          $("#editEmployeeModal").modal('hide');
            loadorgdataList();
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
    // console.log(id);
    $.ajax({
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 4000 + '/' + id,
        type: 'DELETE',
        success: function (data) {
            // cbk(true, data)
            successMsg('Record Deleted Successfully');
            loadorgdataList();
        },
        error: function (e) {
            errorMsg('Error in Record Delete')
        }
    });

}




