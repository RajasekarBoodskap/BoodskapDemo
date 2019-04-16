var user_list = [];
var userTable = null;


var off_details = 1001;

$(document).ready(function () {

    loademployeeList();
    loademployeeList1();

   
});


function loademployeeList() {



    if (userTable) {
        userTable.destroy();
        $("#employeetable").html("");
    }

    var fields = [
        {
            mData: 'employeeid',
            sTitle: 'Employee Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'employeename',
            sTitle: 'Employee Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }

        },
        {
            mData: 'employeeaddress',
            sTitle: 'Employee Address',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
                return data;
            }
        },
       
        {
            mData: 'employeesalary',
            sTitle: 'Employee Salary',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },
        {
            mData: 'employeestatus',
            sTitle: 'Employee Status',
            orderable: false,
            mRender: function (data, type, row) {

                return data ? data : "-";
                return data;
            }
        },



        {
            mData: 'action',
            sTitle: 'Action',
            orderable: false,
            mRender: function (data, type, row) {
                var r = '<button class="btn btn-sm btn-default" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['employeeid'] + '\'' + ', ' + '\'' + row['employeename'] + '\'' + ', ' + '\'' + row['employeeaddress'] + '\'' + ', ' + '\'' + row['employeesalary'] + '\'' + ', ' + '\'' + row['employeestatus'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                   
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
        userTable = $("#employeetable").DataTable(tableOption);
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
       
        var  presentarray=[];
        var  Absencearray=[];
        for(i=0; i<records.length; i++) {
            if(records[i]['_source']['employeestatus']=="present")
            {
                presentarray.push(records[i]);
            }
            
            if(records[i]['_source']['employeestatus']=="Absence")
                {
                Absencearray.push(records[i]);
            }
        }
        console.log(presentarray.length);
        console.log(Absencearray.length);
   
    employee(totalRecords,presentarray.length,Absencearray.length)
    pie1(presentarray.length,Absencearray.length )
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





function pie1(pr, ab) {
    // anychart.onDocumentReady(function () {

        // set the data
        var data = [
            { x: "Present", value: pr },
            { x: "Absence", value: ab }
            // { x: "total", value: total }

        ];

        // create the chart
        var chart = anychart.pie();
       

        // set the chart title
        chart.title("Total Employee details");

        // add the data
        chart.data(data);

        // set legend position
        chart.legend().position("right");
        // set items layout
        chart.legend().itemsLayout("vertical");

        // display the chart in the container
        chart.container('card');
       
        chart.draw();

    // });
}

// pie(presentarray.length,Absencearray.length )
function edit(id,a, b, c, d, e) {
    var uname = document.getElementById("empid1");
    uname.setAttribute("value", a);
    var uoffice = document.getElementById("empname1");
    uoffice.setAttribute("value", b);
    var uschool = document.getElementById("empaddress1");
    uschool.setAttribute("value", c);
    var ucollage = document.getElementById("empsalary1");
    ucollage.setAttribute("value", d);
    var uroll = document.getElementById("empstatus1");
    uroll.setAttribute("value", e);
    
    $("#Editdetails form")[0].reset();
    $("#Editdetails").modal('show');
    $("#employee_edit").click(function () {
        var f = $("#empid1").val();
        var g = $("#empname1").val();
        var h = $("#empaddress1").val();
        var i = $("#empsalary1").val();
        var j = $("#empstatus1").val();

       
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
            'employeeid':name,
            'employeename':office,
            'employeeaddress':school,
            'employeesalary': collage, 
            'employeestatus': roll
        }
    
console.log(obj)
        updateRecords(1001,id, obj,function( status, data){
            if(status){
             successMsg('Details Updated Successfully');
              $("#Editdetails").modal('hide');
                loademployeeList();
            }
            else{
                errorMsg('Error in Updated details')
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
        url: API_BASE_PATH + "/record/delete/" + API_TOKEN + '/' + 1001 + '/' + id,
        type: 'DELETE',
        success: function (data) {
           
            successMsg('Details Deleted Successfully');
            loademployeeList();
        },
        error: function (e) {
            errorMsg('Error in details Delete')
        }
    });

}



function employee(ta,pt,ab)
{
    
   
  
    $("#absence").html(ab)
    $("#present").html(pt)
    $("#total1").html(ta)

}





function loademployeeList1() {



    if (userTable) {
        userTable.destroy();
        $("#employeetable1").html(" ");
    }

    var fields = [
        {
            mData: 'employeeid',
            sTitle: 'Employee Id',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
               
            }
        },
        {
            mData: 'employeename',
            sTitle: 'Employee Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : "-";
             
            }

        },
        
        {
            mData: 'employeestatus',
            sTitle: 'Employee Status',
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
                var r = '<button class="btn btn-sm btn-default" onclick="edit(' + '\'' + row['_id'] + '\'' + ', ' + '\'' + row['employeeid'] + '\'' + ', ' + '\'' + row['employeename'] + '\'' + ', ' + '\'' + row['employeestatus'] + '\'' + '\)"> <i class="fa fa-edit"></i></button>'
                    
                    + '<button class="btn btn-sm btn-default" onclick="del(' + '\'' + row['_id'] + '\'' + ')"><i class="fa fa-trash"></i></button>'
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

            var resultData = searchQueryFormatter1(data).data;
            var resData = resultData['data'];
           
            tableOption['data'] = resData;

            // tableOption['data'] = resData;


        } else {
        }
        userTable = $("#employeetable1").DataTable(tableOption);
    });
}
function searchQueryFormatter1(data) {

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
        
        var  presentarray=[];
        var  Absencearray=[];
        for(i=0; i<records.length; i++) {
            if(records[i]['_source']['employeestatus']=="present")
            {
                presentarray.push(records[i]);
            }
            
            if(records[i]['_source']['employeestatus']=="Absence")
                {
                Absencearray.push(records[i]);
            }
        }
        console.log(presentarray.length);
        console.log(Absencearray.length);
   
    employee(totalRecords,presentarray.length,Absencearray.length)
    // pie1(presentarray.length,Absencearray.length )
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


