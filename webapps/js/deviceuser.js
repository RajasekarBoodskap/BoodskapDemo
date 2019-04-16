var user_list = [];
var userTable = null;

var col_details = 3000;
$(document).ready(function () {

    loaddevicesList();

});


function loaddevicesList() {


    if (userTable) {
        userTable.destroy();
        $("#tablelist").html("");
    }

    var fields = [
        {
            mData: 'colname',
            sTitle: 'Collage name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'colplace',
            sTitle: 'Collage place',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        {
            mData: 'colposition',
            sTitle: 'Collage position',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'colbranches',
            sTitle: 'Collage branches',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        {
            mData: '',
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
           var r='<button class="btn btn-sm btn-icon btn-default" onclick="edit('+ '\'' +row['_id'] + '\'' + ', '+ '\'' + row['colname'] + '\'' + ', '+ '\'' + row['colplace'] + '\'' + ', '+ '\'' + row['colposition'] + '\'' + ', '+ '\'' + row['colbranches'] + '\'' +'\)"> <i class="fa fa-edit"></i></button>'
                  + '<button class="btn btn-sm btn-icon btn-default" onclick="del('+ '\'' +row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
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
    searchByQuery(col_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

          var resultData=searchQueryFormatter(data).data;
          var resData=resultData['data'];
          tableOption['data']=resData;
          


            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#tablelist").DataTable(tableOption);
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


function edit(id,p,q,r,s) {
    console.log(id,p,q,r,s);
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#device_edit").click(function () {
        var f = $("#coln1").val();
        var g = $("#colp1").val();
        var h = $("#coli1").val();
        var i = $("#colb1").val();
        var name;
        var office;
        var school;
        var collage;
        

        if (f != "") {
            name=f;
        }
        else{
            name=p;
        }
        if (g != "") {
            office =g;
        }
        else{
            office=q;
        }
        if (h != "") {
            school=h;
        }
        else{
            school=r;
        }


        if (i != "") {
            collage=i;
        }
        else{
            collage=s;
        }

        


        var obj={
            'colname':name,
            'colplace':office,
            'colposition':school,
            'colbranches': collage
           
        }
        console.log("New values");
        console.log(obj)
       
       
        updateRecords(3000,id, obj,function( status, data){
            if(status){
                successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
                loaddevicesList();
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


function del(id){
    $.ajax({
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 3000 + '/' + id,
        type: 'DELETE',
        success: function (data) {
            // cbk(true, data)
            successMsg('Record Deleted Successfully');
            loaddevicesList();
        },
        error: function (e) {
            errorMsg('Error in Record Delete')
        }
    });
    
}