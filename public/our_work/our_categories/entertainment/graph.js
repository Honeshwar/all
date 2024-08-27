google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["Skincare_Brand_Preference", "Total", { role: "style" }],
    ["Himalaya", 17.2, "#016767"],
    ["MamaEarth", 12.1, "#81c341"],
    ["Dove", 11.0, "#003476"],
    ["Lakme", 10.56, "#1c1c1c"],
    ["Nivea", 10.31, "#182559"],
  ]);

  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 20,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },
    color: "#ffcc00",
    title: "Skincare Brand Preference",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}

google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["reasons", "Total", { role: "style" }],
    ["Customized Based on skin type", 23.6, "#fac803"],
    ["Chemical Free", 23.5, "#fac803"],
    ["Brand Value", 16.8, "#fac803"],
    ["Easy Availablity", 12.1, "#fac803"],
    ["Reviews", 6.6, "#fac803"],
  ]);
  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 30,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    title: "Reasons for Choosing a Skincare Brand",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values1")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}

google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["reasons", "Total", { role: "style" }],
    ["Brand Value", 20.1, "#fac803"],
    ["Safety", 16.7, "#fac803"],
    ["Ease of Maitenance", 14.0, "#fac803"],
    ["Design", 12.4, "#fac803"],
    ["Mileage", 10.1, "#fac803"],
  ]);
  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 25,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    title: "Brand Value. The Top Reason for Automobile Preference",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values2")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}
google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart3);

function drawChart3() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["brands", "Total", { role: "style" }],
    ["Maruti Suzuki", 18.1, "#394092"],
    ["Tata", 15.5, "#0d72bb"],
    ["Honda", 7.4, "#b5192c"],
    ["Mercedes", 6.8, "#1c1c1c"],
    ["Mahindra", 6.5, "#fa0301"],
  ]);
  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 20,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    title:
      "Maruti Suzuki Gets the Lead While Tata Motors Is Giving a Close Competition",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values3")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart4);

function drawChart4() {
  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Rank in Dec'22");
  data.addColumn("number", "Rank in June'23");
  // data.addColumn('number', 'C3');
  // data.addColumn('number', 'C4');
  data.addRows([
    ["Maruti Suzuki", 1, 1],
    ["Honda", 2, 3],
    ["Tata", 3, 2],
    ["Mahindra", 5, 5],
    //   ['Label 4', 40, 45, 50, 55],
    //   ['Label 5', 50, 55, 60, 65]
  ]);

  // Create the chart options
  var options = {
    //   width: 600,
    //   height: 400,
    seriesType: "bars", // Use 'bars' for grouped columns
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 0 },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1 },
    },
    //   vAxes: {
    //     0: {title: 'Comparison 1 and 2'},
    //     1: {title: 'Comparison 3 and 4'}
    //   }
    title:
      "Maruti Suzuki Retains Its Top Position, Tata Motors Surpasses Honda.",
    vAxis: {
      minValue: 6,
      maxValue: 1,
      // format: '#\'%\''
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    colors: ["#ffb200", "#4e4f51"],
  };

  // Create and draw the chart
  var chart = new google.visualization.ComboChart(
    document.getElementById("columnchart_values4")
  );
  chart.draw(data, options);
}

google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart5);

function drawChart5() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["brands", "Total", { role: "style" }],
    ["Honda", 29.0, "#fa0301"],
    ["Hero", 14.5, "#1c1c1c"],
    ["TVS", 11.3, "#394092"],
    ["Royal Enfield", 9.0, "#b5192c"],
    ["Suzuki", 7.9, "#0d72bb"],
  ]);
  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 30,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    title: "Tops Two-wheeler Brands Preferred By Indians",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values5")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart6);

function drawChart6() {
  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Rank in Dec'22");
  data.addColumn("number", "Rank in June'23");
  // data.addColumn('number', 'C3');
  // data.addColumn('number', 'C4');
  data.addRows([
    ["Bajaj Auto", 4, 6],
    ["Piaggio Vehicles", 10, 9],
    ["Royal Enfield", 5, 4],
    ["Suzuki", 7, 5],
    ["Yamaha", 6, 7],
    //   ['Label 4', 40, 45, 50, 55],
    //   ['Label 5', 50, 55, 60, 65]
  ]);

  // Create the chart options
  var options = {
    //   width: 600,
    //   height: 400,
    seriesType: "bars", // Use 'bars' for grouped columns
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 0 },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1 },
    },
    //   vAxes: {
    //     0: {title: 'Comparison 1 and 2'},
    //     1: {title: 'Comparison 3 and 4'}
    //   }
    title:
      "Suzuki, Royal Enfield and Placcio Have Gained Popularity in India in the Last 6 Months",
    vAxis: {
      minValue: 6,
      maxValue: 1,
      // format: '#\'%\''
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    colors: ["#ffb200", "#4e4f51"],
  };

  // Create and draw the chart
  var chart = new google.visualization.ComboChart(
    document.getElementById("columnchart_values6")
  );
  chart.draw(data, options);
}

google.charts.load("current", {
  packages: ["corechart"],
});
google.charts.setOnLoadCallback(drawChart7);

function drawChart7() {
  // data.addColumn('timeofday', 'Time of Day');
  // data.addColumn('number', 'Motivation Level');
  var data = google.visualization.arrayToDataTable([
    ["reasons", "Total", { role: "style" }],
    ["Comfort and Fit", 32.6, "#fac803"],
    ["Quality", 24.7, "#fac803"],
    ["Brand value", 13.0, "#fac803"],
    ["Unique Design", 11.1, "#fac803"],
    ["Price", 8.1, "#fac803"],
  ]);
  var view = new google.visualization.DataView(data);
  var options = {
    vAxis: {
      minValue: 0,
      maxValue: 25,
      format: "#'%'",
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    title: "Comfort & Fit All the Way for a Fashion Brand Preference",
    bar: {
      color: "#ffcc00",
      groupWidth: "60%",
    },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart_values7")
  );
  chart.draw(view, options);
  // chart.draw(data, {vAxis: {format:'#.#%'} } );
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart8);

function drawChart8() {
  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Rank in Dec'22");
  data.addColumn("number", "Rank in June'23");
  // data.addColumn('number', 'C3');
  // data.addColumn('number', 'C4');
  data.addRows([
    ["Park Avenue", 1, 1],
    ["Van Heusen", 4, 2],
    ["U.S. Polo ASSN", 5, 3],
    ["Allen Solly", 3, 5],
    //   ['Yamaha', 6, 7],
    //   ['Label 4', 40, 45, 50, 55],
    //   ['Label 5', 50, 55, 60, 65]
  ]);

  // Create the chart options
  var options = {
    //   width: 600,
    //   height: 400,
    seriesType: "bars", // Use 'bars' for grouped columns
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 0 },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1 },
    },
    //   vAxes: {
    //     0: {title: 'Comparison 1 and 2'},
    //     1: {title: 'Comparison 3 and 4'}
    //   }
    title: "Men's Fashion: Park Avenue Retains Its Position",
    vAxis: {
      minValue: 6,
      maxValue: 1,
      // format: '#\'%\''
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    colors: ["#ffb200", "#4e4f51"],
  };

  // Create and draw the chart
  var chart = new google.visualization.ComboChart(
    document.getElementById("columnchart_values8")
  );
  chart.draw(data, options);
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart9);

function drawChart9() {
  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Rank in Dec'22");
  data.addColumn("number", "Rank in June'23");
  // data.addColumn('number', 'C3');
  // data.addColumn('number', 'C4');
  data.addRows([
    ["Biba", 2, 1],
    ["Fab India", 4, 3],
    ["Levi’s", 3, 4],
    //   ['Allen Solly', 3, 5],
    //   ['Yamaha', 6, 7],
    //   ['Label 4', 40, 45, 50, 55],
    //   ['Label 5', 50, 55, 60, 65]
  ]);

  // Create the chart options
  var options = {
    //   width: 600,
    //   height: 400,
    seriesType: "bars", // Use 'bars' for grouped columns
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 0 },
      2: { targetAxisIndex: 1 },
      3: { targetAxisIndex: 1 },
    },
    //   vAxes: {
    //     0: {title: 'Comparison 1 and 2'},
    //     1: {title: 'Comparison 3 and 4'}
    //   }
    title: "Women's Fashion",
    vAxis: {
      minValue: 6,
      maxValue: 1,
      // format: '#\'%\''
    },
    hAxis: {
      slantedText: true, // Set this to true to display labels vertically
      slantedTextAngle: 45, // Set the angle of the labels (90 degrees for vertical)
    },

    colors: ["#ffb200", "#4e4f51"],
  };

  // Create and draw the chart
  var chart = new google.visualization.ComboChart(
    document.getElementById("columnchart_values9")
  );
  chart.draw(data, options);
}

// google.charts.load("current", {
//   packages: ["corechart"]
// });
// google.charts.setOnLoadCallback(drawChart3);

// function drawChart3() {
//   var data = google.visualization.arrayToDataTable([
//       ['', '0-5 years', '5-10 years', '10-15 years', '15-20 years', '20+ years', {
//           role: 'annotation'
//       }],
//       ['Strongly Disagree', 16, 22, 23, 30, 20, ''],
//       ['Disagree', 16, 22, 23, 30, 26, ''],
//       ['Neither Agree or Disagree', 28, 19, 29, 30, 10, ''],
//       ['Agree', 10, 24, 20, 32, 20, ''],
//       ['Strongly Agree', 10, 24, 20, 32, 30, '']

//   ]);

//   var view = new google.visualization.DataView(data);
//   var options = {
//       isStacked: 'percent',
//       title: "Need for AI upskilling based on years of experience",
//       legend: {
//           position: 'top',
//           maxLines: 3
//       },
//       bar: {
//           groupWidth: '75%'
//       },
//       hAxis: {
//           minValue: 0,
//           ticks: [0, .2, .4, .6, .8, 1]
//       }
//   };
//   var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
//   chart.draw(view, options);
// }

// google.charts.load("current", {
//   packages: ["corechart"]
// });
// google.charts.setOnLoadCallback(drawChart5);

// function drawChart5() {
//   var data = google.visualization.arrayToDataTable([
//       ["ai_impact_workforce", "Total",{ role: "style" }],
//       ["Strongly Disagree", 3.26,'#ffcc00'],
//       ["Disagree", 6.98,'#ffcc00'],
//       ["Neither Agree or Disagree", 27.27,'#ffcc00'],
//       ["Agree", 38.46,'#ffcc00'],
//       ["Strongly Agree", 24.03,'#ffcc00'],
//   ]);
//   var view = new google.visualization.DataView(data);
//   var options = {
//       hAxis: {
//           minValue: 0,
//           maxValue: 50,
//           format: '#\'%\''
//       },

//       title: "Government plays a crucial role",
//       bar: {
//           groupWidth: "75%"
//       },
//       legend: { position: "none" },
//   };
//   var chart = new google.visualization.BarChart(document.getElementById("barchart_values1"));
//   chart.draw(view, options);
// }
