
$(document).ready(function () {
    totalemployeecount();
    // alert("hiii")
})

var TotalAbsence;
function totalemployeecount() {

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: []
    };
    var domainKeyJson = { "match": { "domainKey": DOMAIN_KEY } };

    queryParams['size'] = 1;
    queryParams['from'] = 0;


    var searchJson = {
        "multi_match": {
            "query": '*present*',
            "type": "phrase_prefix",
            "fields": ['_all']
        },

        "multi_match": {
            "query": '*Absence*',
            "type": "phrase_prefix",
            "fields": ['_all']
        }

    };

    queryParams.query['bool']['must'].push(searchJson);

    queryParams.query['bool']['must'].push(domainKeyJson);

    var ajaxObj = {
        "method": "GET",
        "extraPath": "",
        "query": JSON.stringify(queryParams),
        "params": []
    };

    $.ajax({
        "dataType": 'json',
        "contentType": 'application/json',
        "type": "POST",
        "url": API_BASE_PATH + '/elastic/search/query/' + API_TOKEN + '/RECORD?specId=1001',
        "data": JSON.stringify(ajaxObj),
        success: function (data) {
            console.log(data)

            $("#absence").html("")

            // var TotalAbsence = $('#absence').totalemployeecount({
            //     data : ""

            // });
            //    $("#absence").html("1")
            function QueryFormatter(data) {

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

                    return resultObj;

                } else {

                    return resultObj;
                }

            }





          
        }
    });
}
