google.charts.load("current", {
    packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // data.addColumn('timeofday', 'Time of Day');
    // data.addColumn('number', 'Motivation Level');
    var data = google.visualization.arrayToDataTable([
        ["AI_used_employers_hiring", "Total",{ role: "style" }],
        ["Strongly Disagree", 8.69,'#ffcc00'],
        ["Disagree", 18.62,'#ffcc00'],
        ["Neither Agree nor Disagree", 20.10,'#ffcc00'],
        ["Agree", 43.02,'#ffcc00'],
        ["Strongly Agree", 9.57,'#ffcc00'],
    ]);



    var view = new google.visualization.DataView(data);
    var options = {
        vAxis: {
            minValue: 0,
            maxValue: 60,
            format: '#\'%\''
        },
        color:"#ffcc00",
        title: "In favour of using AI for hiring",
        bar: {
            color:'#ffcc00',
            groupWidth: "60%"
        },
        legend: { position: "none" }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
    // chart.draw(data, {vAxis: {format:'#.#%'} } );
}



google.charts.load("current", {
    packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
    // data.addColumn('timeofday', 'Time of Day');
    // data.addColumn('number', 'Motivation Level');
    var data = google.visualization.arrayToDataTable([
        ["ai_impact_satisfaction_bias_discrimination", "Total",{ role: "style" }],
        ["Strongly Disagree", 5.66,'#ffcc00'],
        ["Disagree	", 18.14,'#ffcc00'],
        ["Neither Agree nor Disagree	", 32.57,'#ffcc00'],
        ["Agree	", 33.65,'#ffcc00'],
        ["Strongly Agree", 9.97,'#ffcc00'],
    ]);
    var view = new google.visualization.DataView(data);
    var options = {
        vAxis: {
            minValue: 0,
            maxValue: 60,
            format: '#\'%\''
        },

        title: "AI will create bias and discrimination",
        bar: {
            color:'#ffcc00',
            groupWidth: "60%"
        },
        legend: { position: "none" }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values1"));
    chart.draw(view, options);
    // chart.draw(data, {vAxis: {format:'#.#%'} } );
}



google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart3);

function drawChart3() {
    var data = google.visualization.arrayToDataTable([
        ['', '0-5 years', '5-10 years', '10-15 years', '15-20 years', '20+ years', {
            role: 'annotation'
        }],
        ['Strongly Disagree', 16, 22, 23, 30, 20, ''],
        ['Disagree', 16, 22, 23, 30, 26, ''],
        ['Neither Agree or Disagree', 28, 19, 29, 30, 10, ''],
        ['Agree', 10, 24, 20, 32, 20, ''],
        ['Strongly Agree', 10, 24, 20, 32, 30, '']
       
    ]);


    var view = new google.visualization.DataView(data);
    var options = {
        isStacked: 'percent',
        title: "Need for AI upskilling based on years of experience",
        legend: {
            position: 'top',
            maxLines: 3
        },
        bar: {
            groupWidth: '75%'
        },
        hAxis: {
            minValue: 0,
            ticks: [0, .2, .4, .6, .8, 1]
        }
    };
    var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
    chart.draw(view, options);
}



google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart5);

function drawChart5() {
    var data = google.visualization.arrayToDataTable([
        ["ai_impact_workforce", "Total",{ role: "style" }],
        ["Strongly Disagree", 3.26,'#ffcc00'],
        ["Disagree", 6.98,'#ffcc00'],
        ["Neither Agree or Disagree", 27.27,'#ffcc00'],
        ["Agree", 38.46,'#ffcc00'],
        ["Strongly Agree", 24.03,'#ffcc00'], 
    ]);
    var view = new google.visualization.DataView(data);
    var options = {
        hAxis: {
            minValue: 0,
            maxValue: 50,
            format: '#\'%\''
        },

        title: "Government plays a crucial role",
        bar: {
            groupWidth: "75%"
        },
        legend: { position: "none" },
    };
    var chart = new google.visualization.BarChart(document.getElementById("barchart_values1"));
    chart.draw(view, options);
}