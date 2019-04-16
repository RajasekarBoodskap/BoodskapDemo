var user_list = [];
var userTable = null;

var off_details = 1000;
$(document).ready(function () {

    loadofficedataList();

});


function loadofficedataList() {



    if (userTable) {
        userTable.destroy();
        $("#example").html("");
    }

    var fields = [
        {
            mData: 'personname',
            sTitle: 'Person name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'officename',
            sTitle: 'Office name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        {
            mData: 'officeaddress',
            sTitle: 'Office address',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        // {
        //     mData: 'phonenumber',
        //     sTitle: 'Phone number',
        //     orderable: false,
        //     mRender: function (data, type, row) {

        //         return data ? data : "-";
        //         return data;
        //     }
        // },
        {
            mData: 'salary',
            sTitle: 'Salary',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'startdate',
            sTitle: 'Start date',
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
                var r = '<button class="btn btn-sm btn-default" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['personname'] + '\'' + ', ' + '\'' + row['officename'] + '\'' + ', ' + '\'' + row['officeaddress'] + '\'' + ', ' + '\'' + row['salary'] + '\'' + ', ' + '\'' + row['startdate'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                    //  var r=   '<button class="btn btn-sm btn-default" onclick="edit(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
                    + '<button class="btn btn-sm btn-default" onclick="del(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
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
    searchByQuery(off_details, 'RECORD', searchQuery, function (status, data) {
        if (status) {

            var resultData = searchQueryFormatter(data).data;
            var resData = resultData['data'];
            tableOption['data'] = resData;



            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#example").DataTable(tableOption);
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








function edit(id,a, b, c, d, e) {
    // console.log("old values")
    // console.log(a), b, c, d, e);

console.log(id,a,b,c,d,e);
    
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#offical_edit").click(function () {
        var f = $("#pern1").val();
        var g = $("#offn1").val();
        var h = $("#offa1").val();
        var i = $("#pers1").val();
        var j = $("#perd1").val();

       
        var name;
        var office;
        var school;
        var collage;
        var roll;

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



        var obj={
            'personname':name,
            'officename':office,
            'officeaddress':school,
            'salary': collage, 
            'startdate': roll
        }


        updateRecords(1000,id, obj,function( status, data){
            if(status){
             successMsg('Record Updated Successfully');
              $("#Editdetails").modal('hide');
                loadofficedataList();
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
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 1000 + '/' + id,
        type: 'DELETE',
        success: function (data) {
            // cbk(true, data)
            successMsg('Record Deleted Successfully');
            loadofficedataList();
        },
        error: function (e) {
            errorMsg('Error in Record Delete')
        }
    });

}

        // "personname": "ravi",
        // "officename": "hcl",
        // "officeaddress": "mumbai",
        // "salary": "56000",
        // "startdate": "2018-10-19",
        // "domainKey": "XHPEDIIINI"
        // if (f == undefined) {
        //     name = aa;
        // }
        // if (g == undefined) {
        //     id = bb;
        // }
        // if (h == undefined) {
        //     school = cc;
        // }
        // if (i == undefined) {
        //     roll = dd;
        // }
        // if (j == undefined) {
        //     collage = ee;
        // }







        // console.log("NEW VALUES");
        // console.log("name is--> "+ name);
        // console.log("id is--> "+ id);
        // console.log("school is--> "+ school);
        // console.log("name is--> "+ collage);
        // console.log("id is--> "+ roll);

        // if(a!=f && f!=""){

        //     console.log(f);
        // }
        // else{
        //     console.log(a);
        // }

        // if(b!=g && g!=""){

        //     console.log(g);
        // }
        // else{
        //     console.log(b);
        // }
        // if(c!=h && h!=""){

        //     console.log(h);
        // }
        // else{
        //     console.log(c);
        // }
        // if(d!=i && i!=""){

        //     console.log(i)
        // }
        // else{
        //     console.log(d);
        // }
        // if(e!=j && j!=""){

        //     console.log(j);
        // }
        // else{
        //     console.log(e)
        // }





        // var details1={
        //             personname:f,
        //             officename:g,
        //             officeaddress:h,
        //            //  phonenumber:pc,
        //             salary:i,
        //             startdate:j
        //             }


        //             updateRecord(1000, details1, function (status, data) {
        //                 if (status) {
        //                     successMsg('Record Updated Successfully');
        //                     loadofficedataList();
        //                     // $("#addRecord").modal('hide');
        //                 } else {
        //                     errorMsg('Error in Updating Record')
        //                 }
        //                 $(".btnSubmit").removeAttr('disabled');
        //             })

    




// function del(id) {

//     deleteRecord(id, 1000, function (status, data) {
//         if (status) {

//             successMsg('Record Deleted Successfully');

//             loadofficedataList();

//             // $("#deleteModal").modal('hide');
//         } else {
//             errorMsg('Error in delete')
//         }

//     })
// }











