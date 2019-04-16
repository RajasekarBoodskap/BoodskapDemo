var user_list = [];
var userTable = null;

var home_details = 50001;
$(document).ready(function () {

    loadhomeList();

});


function loadhomeList() {


    if (userTable) {
        userTable.destroy();
        $("#home").html("");
    }

    var fields = [
        {
            mData: 'accost',
            sTitle: 'Ac Cost',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'refcost',
            sTitle: 'Refrigarator Cost',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        {
            mData: 'washcost',
            sTitle: 'WashingMachine Cost',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'tvcost',
            sTitle: 'Telivision Cost',
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
                var r = '<button class="btn btn-sm btn-icon btn-default" onclick="edit(' + '\'' + row["_id"] + '\'' + ', ' + '\'' + row['accost'] + '\'' + ', ' + '\'' + row['refcost'] + '\'' + ',' + '\'' + row['washcost'] + '\'' + ',' + '\'' + row['tvcost'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                    + '<button class="btn btn-sm btn-icon btn-default" onclick="del(' + '\'' + row["_id"] + '\'' + ')"><i class="fa fa-trash"></i></button>'
                return data ? data : r;
                // return data;
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
    searchByQuery(home_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

            var resultData = searchQueryFormatter(data).data;
            var resData = resultData['data'];
            tableOption['data'] = resData;



            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#home").DataTable(tableOption);
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

function edit(idd, a, b, c, d) {
    // console.log("old values")
    // console.log(a), b, c, d, e);
    console.log("old values");
    console.log(idd, a, b, c, d);

    $("#Edithomedetails form")[0].reset();
    $("#Edithomedetails").modal('show');
    $("#home_edit").click(function () {
        var f = $("#acc1").val();
        var g = $("#refc1").val();
        var h = $("#washc1").val();
        var i = $("#telc1").val();

        console.log("new values");
        console.log(f, g, h, i)

        var name;
        var office;
        var school;
        var collage;
        // var roll;

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


        if (i != "") {
            collage = i;
        }
        else {
            collage = d;
        }





        var obj = {
            'accost': name,
            'refcost': office,
            'washcost': school,
            'tvcost': collage

        }

        console.log("object is");
        console.log(obj)

        

        // $.ajax({
        //     url: API_BASE_PATH + "/record/insert/static/" + API_TOKEN + '/' + 50001 + '/' + idd,
        //     data: JSON.stringify(obj),
        //     contentType: "text/plain",
        //     type: 'POST',
        //     success: function (data) {
        //         // cbk(true,data)
        //         console.log(data);
        //         $("#Edithomedetails").modal('hide');
        //         loadhomeList();

        //     },
        //     error: function (e) {
        //         // cbk(false,e)
        //     }
        // });


        updateRecords(50001,idd, obj,function( status, data){
            if(status){
                successMsg('Record Updated Successfully');
              $("#Edithomedetails").modal('hide');
                loadhomeList();
            }
            else{
                errorMsg('Error in Updated Record')
            }
        } )

        // })




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
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 50001 + '/' + id,
        type: 'DELETE',
        success: function (data) {
            // cbk(true, data)
            successMsg('Record Deleted Successfully');
            loadhomeList();
        },
        error: function (e) {
            errorMsg('Error in Record Delete')
        }
    });

}