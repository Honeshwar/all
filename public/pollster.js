let a = "";
let state_name = []; //only LS

let detail_election = [];

//name of exit pollster
let source_name = [];
let title_index;
let survey_name;
let b = 0; //stateindex
let c = 0; //verticall pollster index
let d; //compare pollster index
let ss = [["party", "seats"]];

let isVideossInitial = true;

let yt_urls = [];
let isYT_Ready = false;

const dummyData = [
  { party: "INC", seats: "52" },

  { party: "YSRCP", seats: "22" },

  { party: "OTHERS", seats: "30" },
  { party: "BJP", seats: "303" },
];

const PARTY_ALLIANCE_COLORS_old = {
  // OTH: "#B4B4B4",
  OTHERS: "#B4B4B4",
  BJP: "#ED8918",
  SP: "#487b38",
  BSP: "#4171FE",
  RLD: "#396502",
  IUML: "#518D23",
  "KC(J)": "#CC990B",
  TRS: "#E55672",
  "KC(M)": "#CC990B",
  AGP: "#99CCFF",
  "KC(B)": "#CC990B",
  AINRC: "#F7BF0E",
  CMPKSC: "#FF0000",
  BPF: "#BD0026",
  ADMK: "#447603",
  AITC: "#75C848",
  "Congress(Secular)": "#E97A7E",
  JDS: "#00923F",
  INC: "#5EA449",
  "CPI(M)": "#E64A1D",
  CPM: "#E64A1D",
  CPIM: "#E64A1D",
  AIFB: "#DA461B",
  GJM: "#7CD11B",
  RSP: "#E54E47",
  IND: "#A6A6A6",
  DMK: "#cf451b",
  NCP: "#5CB4B2",
  CPI: "#E64A1D",
  AIUDF: "#4A8118",
  NSC: "#BD0026",
  AD: "#FFA500",
  AAP: "#1B66A4",
  AAAP: "#1B66A4",
  SBSP: "#F5D50A",
  "AD(S)": "#E36FCB",
  TDP: "#FBEC23",
  YSRCP: "#084202",
  SHS: "#E96D1F",
  RJD: "#4B8204",
  BJD: "#396502",
  SAD: "#EF9716",
  LJP: "#3294DD",
  "JD(U)": "#255a8e",
  RLSP: "#999966",
  BLSP: "#999966",
  JKPDP: "#4D8733",
  JMM: "#447E5A",
  JKNC: "#E64C3A",
  INLD: "#3A6600",
  "TMC(M)": "#207bc6",
  "JD(S)": "#006400",
  "BJP+": "#ED8918",
  "INC+": "#5EA449",
  "BSP-SP-RLD": "#0000FF",
  LEFT: "#DE0000",
  AIMIM: "#3A6C49",
  AJSUP: "#DA251C",
  SKM: "#E64A23",
  SDF: "#FAEC0D",
  NDPP: "#E64A21",
  ADAL: "#E36FCB",
  RLTP: "#DBE934",
  JKN: "#FF0000",
  BOPF: "#E8611C",
  "KEC(M)": "#CC990B",
  NPF: "#bd678b",
  NPEP: "#505d98",
  MNF: "#2E5694",
  VCK: "#427bb3",
  "KEC(J)": "#f76940",
  "KEC(B)": "f76940",
  GOJAM: "#7CD11B",
  HAMS: "#4B8204",
  MGB: "#E64A1D",
};
const PARTY_ALLIANCE_COLORS = {
  BJP: "#ea6100",
  "BJP+": "#ea6100",
  NDA: "#ea6100",
  "INC+": "#4a8d3b",
  INC: "#4a8d3b",
  INDIA: "#4a8d3b",
  OTHERS: "#7d7d7d",
  Others: "#7d7d7d",
  "TDP Alliance": "#f7b600",
  YSRCP: "#013000",
  TDP: "#f7b600",
  AIUDF: "#175c00",
  MGB: "#e12a00",
  JMM: "#2e5a3f",
  LDF: "#0075d6",
  UDF: "#cdd300",
  MVA: "#2859a6",
  "NCP (Ajit Pawar)": "#288d8b",
  "NCP (Sharad Pawar)": "#99300f",
  "Shiv Sena (Shinde)": "#295623",
  "Shiv Sena (UBT)": "#295623",
  NPP: "#e24a00",
  VPP: "#114d00",
  NDPP: "#e12a00",
  "AAP+": "#005294",
  BJD: "#1f4200",
  SAD: "#ea7700",
  AAP: "#005294",
  "AIADMK+": "#2b5500",
  "DMK+": "#c11b00",
  BRS: "#db0900",
  AIMIM: "#005328",
  TRS: "#db1845",
  BSP: "#d617ff",
  "SP+": "#295623",
  TMC: "#4054b3",
};

const TABLE_COLORS = {
  BJP: "background: linear-gradient(180deg, #ffa362 0%, #ea6100 100%);",
  "BJP+": "background: linear-gradient(180deg, #ffa362 0%, #ea6100 100%);",
  NDA: "background: linear-gradient(180deg, #ffa362 0%, #ea6100 100%);",
  "INC+": "background: linear-gradient(180deg, #83d877 0%, #4a8d3b 100%);",
  INC: "background: linear-gradient(180deg, #83d877 0%, #4a8d3b 100%);",
  INDIA: "background: linear-gradient(180deg, #83d877 0%, #4a8d3b 100%);",
  Others: "background: linear-gradient(180deg, #cfcfcf 0%, #7d7d7d 100%);",
  "TDP Alliance":
    "background: linear-gradient(180deg, #ffd864 0%, #f7b600 100%);",
  YSRCP: "background: linear-gradient(180deg, #1b5824 0%, #013000 100%);",
  TDP: "background: linear-gradient(180deg, #ffd864 0%, #f7b600 100%);",
  AIUDF: "background: linear-gradient(180deg, #5cb737 0%, #175c00 100%);",
  MGB: "background: linear-gradient(180deg, #ee7353 0%, #e12a00 100%);",

  JMM: "background: linear-gradient(180deg, #68a687 0%, #2e5a3f 100%);",
  LDF: "background: linear-gradient(180deg, #66b1ee 0%, #0075d6 100%);",
  UDF: "background: linear-gradient(180deg, #f2fa6b 0%, #cdd300 100%);",
  MVA: "background: linear-gradient(180deg, #6694dc 0%, #2859a6 100%);",

  "NCP (Ajit Pawar)":
    "background: linear-gradient(180deg, #9ed8d6 0%, #288d8b 100%);",
  "NCP (Sharad Pawar)":
    "background: linear-gradient(180deg, #cf7357 0%, #99300f 100%);",
  "Shiv Sena (Shinde)":
    "background: linear-gradient(180deg, #66a164 0%, #295623 100%);",
  "Shiv Sena (UBT)":
    "background: linear-gradient(180deg, #66a164 0%, #295623 100%);",
  NPP: "background: linear-gradient(180deg, #f08b5f 0%, #e24a00 100%);",
  VPP: "background: linear-gradient(180deg, #5db93f 0%, #114d00 100%);",
  NDPP: "background: linear-gradient(180deg, #ee7352 0%, #e12a00 100%);",
  "AAP+": "background: linear-gradient(180deg, #468ed3 0%, #005294 100%);",
  BJD: "background: linear-gradient(180deg, #5b8a04 0%, #1f4200 100%);",
  SAD: "background: linear-gradient(180deg, #ffb556 0%, #ea7700 100%);",
  AAP: "background: linear-gradient(180deg, #468ed3 0%, #005294 100%);",
  "AIADMK+": "background: linear-gradient(180deg, #68a416 0%, #2b5500 100%);",
  "DMK+": "background: linear-gradient(180deg, #e5684f 0%, #c11b00 100%);",
  BRS: "background: linear-gradient(180deg, #f27e79 0%, #db0900 100%);",
  AIMIM: "background: linear-gradient(180deg, #5c8e6e 0%, #005328 100%);",
  TRS: "background: linear-gradient(180deg, #f38597 0%, #db1845 100%);",
  BSP: "background: linear-gradient(180deg, #ea8cfe 0%, #d617ff 100%);",
  "SP+": "background: linear-gradient(180deg, #66a164 0%, #295623 100%);",
  TMC: "background: linear-gradient(180deg, #969bda 0%, #4054b3 100%);",
};

$(document).ready(function () {
  $("#selected_state").on("click", function (e) {
    e.stopPropagation();
    //console.log("df");
    $("#compare_pollster").hide();
    $("#state_selection").toggle();
    $(window).on("click", function (e) {
      $("#state_selection").hide();
    });
  });

  $("#selected_compare_pollster").on("click", function (e) {
    e.stopPropagation();
    //console.log("df");
    $("#state_selection").hide();
    $("#compare_pollster").toggle();
    $(window).on("click", function (e) {
      $("#compare_pollster").hide();
    });
  });

  //fetching all states
  async function fetchState() {
    const resp = await fetch("https://dhruvresearch.com/api/v2/home/initial");
    const res = await resp.json();

    //console.log(res);
    detail_election = JSON.stringify(res);

    const moveIndiaToFront = ensureDhruvResearchAtZero(res.data, "INDIA");
    moveIndiaToFront.forEach((stateName, i) => {
      state_name.push(stateName);

      a +=
        `<li class="dropdown-item" onClick="handleStateChange(${i})">` +
        stateName +
        "</li>";
    });
    document.getElementById("state_selection").innerHTML = a;

    document.querySelector("#selected_state span").innerHTML = state_name[0];

    //first state in array select and corresponding compare pollster dropdown option get
    await source(0); //awaitt because there is async task in it that is fetching source/agency name that we futher stored in source_name array that we will need at source_number function
    //pass state index and pollster index
    source_number(0, 0);
    //   splide.mount();
    addData(0); //result(0); //live poll
    videoss(0);
    // aa();
  }
  fetchState();
});

//on state change
function handleStateChange(newIndex) {
  b = newIndex;
  c = 0;
  d = null;
  document.querySelector("#selected_compare_pollster span").innerHTML =
    "Compare Pollster";
  source(newIndex);
  source_number(newIndex, c);
  addData(newIndex);
  videoss(newIndex);
  document.querySelector("#selected_state span").innerHTML =
    state_name[newIndex];
}

function ensureDhruvResearchAtZero(data, name) {
  const index =
    name === "DHRUV RESEARCH"
      ? data.findIndex((item) => item.source.toUpperCase() === name)
      : data.findIndex((item) => item.toUpperCase() === name);
  if (index !== -1 && index !== 0) {
    // Remove "Dhruv Research" from its current position
    const dhruvResearch = data.splice(index, 1)[0];
    // Add "Dhruv Research" at the 0th index
    data.unshift(dhruvResearch);
  }
  return data;
}
//to get compare pollster name and set it in compare pollster dropdown and vertical slider using aa function
async function source(v) {
  try {
    let e = `<li class='dropdown-item' onclick="comparePollster(-1)">Compare Pollster</li>`;
    let f;
    const resp = await fetch(
      "https://dhruvresearch.com/api/v2/home/exit-polls?state=" +
        encodeURIComponent(state_name[v]) +
        "&election_type=LS"
    );
    const res = await resp.json();
    res.data = ensureDhruvResearchAtZero(res.data, "DHRUV RESEARCH"); //Dhruv Research
    //console.log(res.data);
    document.getElementById("survey_name").innerHTML = res.data[0].source;
    $("#table-seat1").text(res.data[0].source);
    survey_name = res.data[0].source; //initial only one pollser name on top of table

    source_name = []; //reset value on state change
    res.data.forEach((element, i) => {
      source_name.push(element.source); //store pollster name

      e +=
        `<li onclick="comparePollster('${i}')" class="dropdown-item">` +
        element.source +
        "</li>";
      f += '<div class="slidesr"><p>' + element.source + "</p></div>";
    });
    document.getElementById("compare_pollster").innerHTML = e;
    document.getElementById("source_slider").innerHTML =
      '<div  class="centerslider" style="height: fit-content;">' + f + "</div>";
    aa(); //initialize vertical pollster name slider on basis of state

    // add element to compare pollster dropdown ,initialize vertical slider , live poll and video
  } catch (error) {
    console.log(
      "error while fetching all pollster name and table & pie data",
      error
    );
  }
}

//initial called to setup table on based on default pollster from vertical slider
//call at initial and oin state change
async function source_number(n, m) {
  //console.log("sourceNumber", source_name[m], source_name);
  //stateindex , pollster index selected from vertical slider
  try {
    const resp = await fetch(
      "https://dhruvresearch.com/api/v2/home/exit-polls/" +
        source_name[m] +
        "?state=" +
        encodeURIComponent(state_name[n]) +
        "&election_type=LS"
    );
    const res = await resp.json();
    let z = res.data;
    console.log(res);
    ////console.log(res.data[1].data);
    // let z = res.data[m].data;
    let e = "";
    const parties = Object.keys(z);
    let seats = {};

    for (let partyNameAsKey in z) {
      const seat = z[partyNameAsKey];

      if (seat.includes("-")) {
        const n = Number(seat.split("-")[1]);
        seats[partyNameAsKey] = n;
      } else {
        seats[partyNameAsKey] = Number(seat);
      }
    }

    const keys = sortPartiesBySeats(parties, seats);

    // console.log(keys);

    const othersIndex = keys.indexOf("Others");
    if (othersIndex !== -1) {
      keys.splice(othersIndex, 1);
      keys.push("Others");
    }
    $("#table-seat2").hide();
    keys.forEach((key, index) => {
      e +=
        `  <tr class="TABLE-TEXT" style="${
          TABLE_COLORS[key]
            ? TABLE_COLORS[key]
            : "background: linear-gradient(180deg, #999 0%, #000 100%);"
        }"><td>` +
        key +
        "</td><td>" +
        z[key] +
        "</td> ";
    });
    document.getElementById("table_value").innerHTML = e;
  } catch (error) {
    console.log("error while fetching data using vertical input", error);
  }
}

//on click on compare pollster name from dropdown
function comparePollster(val) {
  //console.log(val);

  if (val == -1) {
    d = null;
    document.getElementById("survey_name").innerHTML = survey_name;
    document.querySelector("#selected_compare_pollster span").innerHTML =
      "Compare Pollster";

    fetch(
      "https://dhruvresearch.com/api/v2/home/exit-polls/" +
        encodeURIComponent(source_name[c]) +
        "?state=" +
        encodeURIComponent(state_name[b]) +
        "&election_type=LS"
    )
      .then((resp) => resp.json())
      .then((res) => {
        // var z = res.data[c].data;

        let z = res.data;
        let e = "";
        const keys = Object.keys(z);
        const othersIndex = keys.indexOf("Others");
        if (othersIndex !== -1) {
          keys.splice(othersIndex, 1);
          keys.push("Others");
        }
        //console.log("pollster partynames at comparePollster", keys);

        $("#table-seat2").hide();
        keys.forEach((key, index) => {
          e +=
            `  <tr class="TABLE-TEXT" style="${
              TABLE_COLORS[key]
                ? TABLE_COLORS[key]
                : "background: linear-gradient(180deg, #999 0%, #000 100%);"
            }"><td>` +
            key +
            "</td><td>" +
            z[key] +
            "</td>";
        });
        document.getElementById("table_value").innerHTML = e;
      });
  } else {
    d = val;

    compare_value();
    //console.log(d, source_name[d]);

    document.getElementById("survey_name").innerHTML =
      survey_name + " vs " + source_name[d];

    document.querySelector("#selected_compare_pollster span").innerHTML =
      source_name[d];
  }
}

async function compare_value() {
  //b = state input index correspond to an state name array
  //c = pollster input index correspond to source_name array
  //d = compare pollster index correspond to source_name array
  try {
    const resp1 = await fetch(
      "https://dhruvresearch.com/api/v2/home/exit-polls/" +
        encodeURIComponent(source_name[c]) +
        "?state=" +
        encodeURIComponent(state_name[b]) +
        "&election_type=LS"
    );
    const resp2 = await fetch(
      "https://dhruvresearch.com/api/v2/home/exit-polls/" +
        encodeURIComponent(source_name[d]) +
        "?state=" +
        encodeURIComponent(state_name[b]) +
        "&election_type=LS"
    );
    const res1 = await resp1.json();
    const res2 = await resp2.json();

    const totalParty = [];
    //console.log(res1, res2);
    let z = res1.data;
    let y = res2.data; //compare pollster data
    let e = "";
    const keys1 = Object.keys(z);
    const keys2 = Object.keys(y);
    const parties = combineTwoPollsterData(keys1, keys2);

    let seats = {};

    for (let partyNameAsKey in z) {
      const seat = z[partyNameAsKey];

      if (seat.includes("-")) {
        const n = Number(seat.split("-")[1]);
        seats[partyNameAsKey] = n;
      } else {
        seats[partyNameAsKey] = Number(seat);
      }
    }
    const keys = sortPartiesBySeats(parties, seats);
    // console.log(keys);

    const othersIndex = keys.indexOf("Others");
    if (othersIndex !== -1) {
      keys.splice(othersIndex, 1);
      keys.push("Others");
    }

    // const resp = await fetch(
    //   "https://dhruvresearch.com/api/v2/home/exit-polls?state=" +
    //     state_name[b] +
    //     "&election_type=LS"
    // );
    // const res = await resp.json(); //await resp.json())

    // var z = res.data[c].data;
    // var y = res.data[d].data; //compare pollster data
    // var e = "";
    // const keys = Object.keys(z);
    $("#table-seat2").text(source_name[d]);
    $("#table-seat2").show();
    keys.forEach((key, index) => {
      e +=
        `  <tr class="TABLE-TEXT" style="${
          TABLE_COLORS[key]
            ? TABLE_COLORS[key]
            : "background: linear-gradient(180deg, #999 0%, #000 100%);"
        }"><td>` +
        key +
        "</td><td>" +
        (z[key] ? z[key] : "-") +
        "</td><td>" +
        (y[key] ? y[key] : "-") +
        "</td></tr>";
    });
    document.getElementById("table_value").innerHTML = e;
  } catch (error) {
    console.log("error compare_value", error);
  }
  // fetch(
  //   "https://dhruvresearch.com/api/v2/home/exit-polls?state=" +
  //     state_name[b] +
  //     "&election_type=LS"
  // )
  //   .then((resp) => resp.json())
  //   .then((res) => {
  //     var z = res.data[c].data;
  //     var y = res.data[d].data; //compare pollster data
  //     var e = "";
  //     const keys = Object.keys(z);

  //     $("#table-seat2").show();
  //     keys.forEach((key, index) => {
  //       e +=
  //         '  <tr class="' +
  //         key +
  //         " TABLE-TEXT" +
  //         '"><td>' +
  //         key +
  //         "</td><td>" +
  //         z[key]
  //           ? z[key]
  //           : "-" + "</td><td>" + y[key]
  //           ? y[key]
  //           : "-" + "</td></tr>";
  //     });
  //     document.getElementById("table_value").innerHTML = e;
  //   });
}

//on state change in dropdown call addData function to get live poll
var myc = null;
const ctx = document.getElementById("myChart");
const data = {
  labels: [],
  datasets: [
    {
      label: "", // label: "Seats",
      data: [],
      backgroundColor: [],
      // hoverOffset: 4
    },
  ],
};
const totalSeats = 543;
data.labels.push(""); //"bjp", "congress", "india", "others"
data.datasets[0].data.push(543);
data.datasets[0].backgroundColor.push("rgba(255, 99, 132, 0.2)");

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true, // This removes the legend
        position: "bottom",
        onClick: null,
        labels: {
          usePointStyle: true,
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltips: {
        enabled: true,
      },
    },

    // onHover: function (event, chartElement) {
    //   if (chartElement.length > 0) {
    //     $("#center_text").css({ top: "45%" });
    //   } else {
    //     $("#center_text").css({ top: "40%" });
    //   }
    // },
  },
};
myc = new Chart(ctx, config);

async function addData(n) {
  try {
    //console.log("gdfghgfsdbfgfdgfb");
    const resp = await fetch(
      "https://dhruvresearch.com/api/v2/home/eci-results/alliancewise?state=" +
        encodeURIComponent(state_name[n]) +
        "&election_type=LS" +
        "&year=2024"
    );

    if (resp.status == 400 || !resp.ok) {
      myc.data.datasets[0].data = [];
      myc.data.labels = [];

      // myc.data = newData;
      myc.data.labels.push(543);
      myc.data.datasets[0].data.push("");

      // document.getElementById("center_text").innerHTML =
      //   totalSeats + "/" + totalSeats;
      myc.update();
      $("#not-live-note").css({ color: "red", fontWeight: 700 });
      throw new Error("HTTP-Error: " + resp.status);
    } else {
      const res = await resp.json();

      // //console.log(res);

      myc.data.datasets[0].data = [];
      myc.data.labels = [];

      const { newData, totalSeats } = extractECI_Data(res.data);
      console.log("new data", newData);
      myc.data = {
        ...newData,
      };

      document.getElementById("center_text").innerHTML =
        totalSeats + "/" + totalSeats;
      myc.update();
      $("#not-live-note").text(
        "Note: Result Seat count is the total of Leading and Won seats"
      );
      $("#not-live-note").css({ color: "#6c757d", fontWeight: 400 });
    }
  } catch (error) {
    console.log(
      "error while fetching data of live result from addData function",
      error
    );
  }
}

// initialize doughnut chart at load
// async function result(n) {
//   try {
//     // var e =[['party','seats']];
//     const resp = await fetch(
//       "https://dhruvresearch.com/api/v2/home/eci-results?state=" +
//         encodeURIComponent(state_name[n]) +
//         "&election_type=LS" +
//         "&year=2024"
//       // +
//       // "&year=2024"
//     );

//     ////console.log(resp);
//     if (resp.status === 400 || !resp.ok) {
//       // FOR TESTING PURPOSES
//       // const { newData, totalSeats } = extractECI_Data(dummyData);
//       // document.getElementById("center_text").innerHTML =
//       //   totalSeats + "/" + totalSeats;
//       // console.log("pie", newData);
//       // const config = {
//       //   type: "doughnut",
//       //   data: newData,
//       //   options: {
//       //     plugins: {
//       //       legend: {
//       //         display: false, // This removes the legend
//       //       },
//       //       tooltips: {
//       //         enabled: "none",
//       //       },
//       //     },
//       //   },
//       // };

//       // dummy data
//       const data = {
//         labels: [],
//         datasets: [
//           {
//             label: "", // label: "Seats",
//             data: [],
//             backgroundColor: [],
//             // hoverOffset: 4
//           },
//         ],
//       };
//       const totalSeats = 543;
//       data.labels.push(""); //"bjp", "congress", "india", "others"
//       data.datasets[0].data.push(543);
//       data.datasets[0].backgroundColor.push("rgba(255, 99, 132, 0.2)");

//       const config = {
//         type: "doughnut",
//         data: data,
//         options: {
//           plugins: {
//             legend: {
//               display: false, // This removes the legend
//             },
//             tooltips: {
//               enabled: "none",
//             },
//           },
//         },
//       };
//       myc = new Chart(ctx, config);
//       $("#not-live-note").show();
//       throw new Error(`HTTP error! Status: ${resp.status}`);
//     } else {
//       const res = await resp.json();

//       if (res) {
//         // //console.log(res);

//         const { newData, totalSeats } = extractECI_Data(res.data);
//         //console.log(Number(totalSeats));
//         document.getElementById("center_text").innerHTML =
//           totalSeats + "/" + totalSeats;

//         const config = {
//           type: "doughnut",
//           data: newData,
//           options: {
//             plugins: {
//               legend: {
//                 display: false, // This removes the legend
//               },
//               tooltips: {
//                 enabled: "none",
//               },
//             },
//           },
//         };

//         myc = new Chart(ctx, config, {
//           options: {
//             borderWidth: 10,
//             borderRadius: 2,
//           },
//         });
//         $("#not-live-note").hide();
//       }
//     }
//     // aaa();
//   } catch (error) {
//     console.log("error while fetching initial live result", error);
//   }
// }

var splide_YT_Video = new Splide("#video-caraousal", {
  type: "loop",
  perPage: 4,
  perMove: 2,
  autoScroll: true,
  //  dots: false,
  pagination: false,
  // lazyLoad: "nearby",
  breakpoints: {
    1000: {
      perPage: 4,
    },
    768: {
      perPage: 1,
    },
    576: {
      perPage: 1,
    },
  },
});

//vertical slider setup
function aa() {
  // console.log("aa called");
  $(".centerslider").slick({
    vertical: true,
    verticalSwiping: true,
    centerMode: true,
    // centerPadding: "60px",
    // slidesToShow: 3,
    // slidesToScroll: 1,
    infinite: false, // Ensure infinite is set to false
    slidesToShow: 1, // Adjust this to the number of items you want to show
    slidesToScroll: 1,
    arrows: true,

    prevArrow:
      "<button type='button' class='s-prev'><img alt='image' src='./caretcircledoubleup.svg'></button>",
    nextArrow:
      "<button type='button' class='s-next'><img alt='image' src='caretcircledoubleup (1).svg'></button>",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          // centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          // arrows: true,
          // centerMode: true,
          // centerPadding: "40px",
          slidesToShow: 3,
        },
      },
    ],
  });
  // $(".slickSlider").show();
  $(".centerslider").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      async function slideIt() {
        try {
          c = currentSlide;
          survey_name = source_name[c];
          let compareFilterIndex = d ? d : undefined; //$
          let compare_pollster_name = compareFilterIndex
            ? source_name[compareFilterIndex]
            : undefined;
          if (compare_pollster_name == undefined) {
            document.getElementById("survey_name").innerHTML = survey_name;
          } else {
            $("#table-seat2").text(compare_pollster_name);
            document.getElementById("survey_name").innerHTML =
              survey_name + " vs " + compare_pollster_name;
          }
          $("#table-seat1").text(survey_name);
          //all source and its data it give as response
          if (d) {
            const resp1 = await fetch(
              "https://dhruvresearch.com/api/v2/home/exit-polls/" +
                encodeURIComponent(source_name[c]) +
                "?state=" +
                encodeURIComponent(state_name[b]) +
                "&election_type=LS"
            );
            const resp2 = await fetch(
              "https://dhruvresearch.com/api/v2/home/exit-polls/" +
                encodeURIComponent(source_name[d]) +
                "?state=" +
                encodeURIComponent(state_name[b]) +
                "&election_type=LS"
            );
            const res1 = await resp1.json();
            const res2 = await resp2.json();

            let z = res1.data;
            let y = res2.data;

            //if use all data then use this
            // let z = res.data[currentSlide].data;
            // let y = res.data[d].data;
            let e = "";
            const keys1 = Object.keys(z);
            const keys2 = Object.keys(y);
            const parties = combineTwoPollsterData(keys1, keys2);

            let seats = {};

            for (let partyNameAsKey in z) {
              const seat = z[partyNameAsKey];

              if (seat.includes("-")) {
                const n = Number(seat.split("-")[1]);
                seats[partyNameAsKey] = n;
              } else {
                seats[partyNameAsKey] = Number(seat);
              }
            }
            const keys = sortPartiesBySeats(parties, seats);
            // console.log(keys);

            const othersIndex = keys.indexOf("Others");
            if (othersIndex !== -1) {
              keys.splice(othersIndex, 1);
              keys.push("Others");
            }

            $("#table-seat2").show();
            keys.forEach((key, index) => {
              e +=
                `  <tr class="TABLE-TEXT" style="${
                  TABLE_COLORS[key]
                    ? TABLE_COLORS[key]
                    : "background: linear-gradient(180deg, #999 0%, #000 100%);"
                }"><td>` +
                key +
                "</td><td>" +
                (z[key] ? z[key] : "-") +
                "</td><td>" +
                (y[key] ? y[key] : "-") +
                "</td></tr>";
            });
            document.getElementById("table_value").innerHTML = e;
          } else {
            const resp = await fetch(
              "https://dhruvresearch.com/api/v2/home/exit-polls/" +
                encodeURIComponent(source_name[c]) +
                "?state=" +
                encodeURIComponent(state_name[b]) +
                "&election_type=LS"
            );
            const res = await resp.json();
            let z = res.data;

            //if use all data then use this
            // let z = res.data[currentSlide].data;

            let e = "";
            const parties = Object.keys(z);
            let seats = {};

            for (let partyNameAsKey in z) {
              const seat = z[partyNameAsKey];

              if (seat.includes("-")) {
                const n = Number(seat.split("-")[1]);
                seats[partyNameAsKey] = n;
              } else {
                seats[partyNameAsKey] = Number(seat);
              }
            }
            const keys = sortPartiesBySeats(parties, seats);
            // console.log(keys);
            const othersIndex = keys.indexOf("Others");
            if (othersIndex !== -1) {
              keys.splice(othersIndex, 1);
              keys.push("Others");
            }

            $("#table-seat2").hide();
            keys.forEach((key, index) => {
              e +=
                `  <tr class="TABLE-TEXT" style="${
                  TABLE_COLORS[key]
                    ? TABLE_COLORS[key]
                    : "background: linear-gradient(180deg, #999 0%, #000 100%);"
                }"><td>` +
                key +
                "</td><td>" +
                z[key] +
                "</td>";
            });
            document.getElementById("table_value").innerHTML = e;
          }
        } catch (error) {
          console.log(
            "error while on vertical slider moving and input change and fetching table and pie data",
            error
          );
        }
      }

      slideIt();
    }
  );

  ////console.log($(".centerslider").slick("slickNext"));
}

//get youtube videos url on basis of state,year,electiontype using these array and index

// async function videoss(n) {
//   try {
//     let res = await fetch(
//       "https://dhruvresearch.com/api/v2/home/youtube-urls?state=" +
//         encodeURIComponent(state_name[n]) +
//         "&election_type=LS"
//     );
//     //console.log(res);
//     if (res.status === 400) {
//       throw new Error("HTTP-Error: " + res.status);
//     }
//     res = await res.json();

//     // //console.log(res.urls);
//     if (!res.urls) throw new Error("HTTP-Error: " + res.status);
//     let e = "";
//     // if (!isVideossInitial) {
//     //   console.log(splide_YT_Video);
//     //   document.getElementById("vidd").innerHTML = "";
//     //   splide_YT_Video.destroy();
//     //   // while (splide_YT_Video.length > 0) {
//     //   //   splide_YT_Video.remove(splide_YT_Video.length - 1);
//     //   // }
//     //   splide_YT_Video.mount();
//     // }
//     res.urls.forEach((element) => {
//       e +=
//         '<li class="splide__slide my-1 px-1"> <iframe width="100%" height="200" src="' +
//         element +
//         '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </li>';
//     });
//     document.getElementById("vidd").innerHTML = e;

//     // if (isVideossInitial) {
//     splide_YT_Video.mount();
//     //   isVideossInitial = false;
//     // }
//   } catch (error) {
//     console.log("error in video url", error);
//   }
// }

async function videoss(n) {
  try {
    let res = await fetch(
      "https://dhruvresearch.com/api/v2/home/youtube-urls?state=" +
        encodeURIComponent(state_name[n]) +
        "&election_type=LS"
    );
    //console.log(res);
    if (res.status === 400) {
      throw new Error("HTTP-Error: " + res.status);
    }
    res = await res.json();

    // console.log(res.urls);
    if (!res.urls) throw new Error("HTTP-Error: " + res.status);
    let e = "",
      splidesArr = [];
    if (isVideossInitial && isYT_Ready) {
      // YT_PLAYERS = [];
      splide_YT_Video.mount();
      isVideossInitial = false;
      // console.log("first time mount");
      res.urls.forEach((element) => {
        const youtubeID = extractYoutubeId(element);

        const li = document.createElement("li");
        li.classList.add("splide__slide", "my-1", "px-1");
        const player = new YT.Player(li, {
          height: "200",
          width: "100%",
          videoId: youtubeID,
          events: {
            onReady: onLivePlayerReady,
            // onStateChange: onLivePlayerStateChange,
          },
        });
        // YT_PLAYERS.push(player);
        li.appendChild(player.getIframe());

        splidesArr.push(li);
      });
      splide_YT_Video.add(splidesArr);
    } else if (!isVideossInitial && isYT_Ready) {
      // console.log("remove");
      // YT_PLAYERS = [];
      res.urls.forEach((element) => {
        const youtubeID = extractYoutubeId(element);

        const li = document.createElement("li");
        li.classList.add("splide__slide", "my-1", "px-1");
        const player = new YT.Player(li, {
          height: "200",
          width: "100%",
          videoId: youtubeID,
          events: {
            onReady: onLivePlayerReady,
            // onStateChange: onLivePlayerStateChange,
          },
        });
        // YT_PLAYERS.push(player);
        li.appendChild(player.getIframe());

        splidesArr.push(li);
      });
      splide_YT_Video.add(splidesArr);
      const deleteIndices = [];
      for (let i = 0; i < splide_YT_Video.length - res.urls.length; i++) {
        deleteIndices.push(i);
      }
      // while (splide_YT_Video.length - res.urls.length - 1 >= 0) {
      //   splide_YT_Video.remove(splide_YT_Video.length - res.urls.length - 1);
      // }
      splide_YT_Video.remove(deleteIndices);
    } else {
      yt_urls.push(...res.urls);
    }

    // console.log(" mount", splide_YT_Video);
  } catch (error) {
    console.log("error in video url", error);
  }
}

// function on click of next button

function extractECI_Data(data) {
  const resultData = {
    seats: [],
    party: [],
  };

  for (const obj of data) {
    resultData.seats.push(Number(obj.seats)); //Number(obj.seats)
    resultData.party.push(obj.party);
  }

  //calculate total seats
  let ts = 0;
  for (let a = 0; a < resultData.party.length; a++) {
    ts += resultData.seats[a];
  }

  const backgroundColor = [];
  const findIndexofOthers = resultData.party.indexOf("OTHERS");
  if (findIndexofOthers !== -1) {
    resultData.party.splice(findIndexofOthers, 1);
    resultData.party.push("OTHERS"); //last add
    const otherSeat = resultData.seats[findIndexofOthers];
    resultData.seats.splice(findIndexofOthers, 1);
    resultData.seats.push(otherSeat); //last add
  }

  for (let i = 0; i < resultData.party.length; ) {
    if (PARTY_ALLIANCE_COLORS[resultData.party[i]] === undefined) {
      //assuming last element/party is other
      let findIndex = resultData.party.indexOf(resultData.party[i]);
      resultData.party.splice(findIndex, 1);
      resultData.seats[resultData.seats.length - 1] +=
        resultData.seats[findIndex]; //others as last party combine non getting color of party
      resultData.seats.splice(findIndex, 1);
    } else {
      backgroundColor.push(PARTY_ALLIANCE_COLORS[resultData.party[i]]);
      i++;
    }
  }
  newData = {
    labels: resultData.party,
    datasets: [
      {
        label: "Seats",
        backgroundColor: backgroundColor,
        data: resultData.seats,
      },
    ],
  };
  return { newData, totalSeats: ts };
}
// console.log(extractECI_Data(dummyData));

// using YT API
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.

function extractYoutubeId(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

// let YT_PLAYERS = [];
function onYouTubeIframeAPIReady2() {
  isYT_Ready = true;
  if (isVideossInitial) {
    splide_YT_Video.mount();
    isVideossInitial = false;
    console.log("first time mount at onYouTubeIframeAPIReady2", yt_urls);
    const splidesArr = [];
    yt_urls.forEach((element) => {
      const youtubeID = extractYoutubeId(element);

      const li = document.createElement("li");
      li.classList.add("splide__slide", "my-1", "px-1");
      const player = new YT.Player(li, {
        height: "200",
        width: "100%",
        videoId: youtubeID,
        events: {
          onReady: onLivePlayerReady,
          // onStateChange: onLivePlayerStateChange,
        },
      });
      // YT_PLAYERS.push(player);
      li.appendChild(player.getIframe());

      splidesArr.push(li);
    });
    splide_YT_Video.add(splidesArr);
  }
}

function onLivePlayerReady(event) {
  // console.log(event);

  splide_YT_Video.on("move", function (oldIndex, newIndex) {
    event.target.pauseVideo(); // player.pauseVideo();
  });
}
// function onLivePlayerStateChange(event) {
//   console.log("state change", event);
//   if (event.data == YT.PlayerState.PLAYING) {
//     players.forEach(function (player) {
//       console.log("player", player);
//       if (player !== event.target) {
//         player.pauseVideo();
//       }
//     });
//   }
// }
//function for table data

function combineTwoPollsterData(k1, k2) {
  let t = [];
  if (k1.length >= k2.length) {
    while (k1.length !== 0) {
      const indexOf = k2.indexOf(k1[0]);
      if (indexOf === -1) {
        t.push(k1[0]);
        k1.splice(0, 1);
      } else {
        t.push(k1[0]);
        k1.splice(0, 1);
        k2.splice(indexOf, 1);
      }
    }

    //check is k2 empth
    if (k1.length !== 0) {
      t.push(...k1);
    }
    if (k2.length !== 0) {
      t.push(...k2);
    }
  } else {
    while (k2.length !== 0) {
      const indexOf = k1.indexOf(k2[0]);
      if (indexOf === -1) {
        t.push(k2[0]);
        k2.splice(0, 1);
      } else {
        t.push(k2[0]);
        k2.splice(0, 1);
        k1.splice(indexOf, 1);
      }
    }

    //check is k2 empth
    if (k1.length !== 0) {
      t.push(...k1);
    }
    if (k2.length !== 0) {
      t.push(...k2);
    }
  }
  return t;
}

function sortPartiesBySeats(parties, seats) {
  // console.log(seats);
  // Helper function to get the first seat value or handle undefined cases
  function getFirstSeatValue(party) {
    if (seats[party]) {
      return seats[party];
    }
    return undefined; // Default to 0 if undefined or not available
  }

  // Sort the parties based on the first seat value
  return parties.sort((a, b) => {
    const seatA = getFirstSeatValue(a);
    const seatB = getFirstSeatValue(b);

    // Handle undefined values: treat them as greater when sorting ascending, and as smaller when sorting descending
    if (seatA === undefined && seatB === undefined) return 0;
    if (seatA === undefined) return 1; //isAscendingSort ? 1 : 1;
    if (seatB === undefined) return -1; //isAscendingSort ? -1 : -1;

    // Perform the standard comparison for defined values
    return seatB - seatA;
  });
}

//     // FOR TESTING PURPOSES DOUGHNUT CHART
// $("#not-live-note").click(() => {
//   {
//     const { newData, totalSeats } = extractECI_Data(dummyData);
//     document.getElementById("center_text").innerHTML =
//       totalSeats + "/" + totalSeats;
//     console.log("pie", newData);
//     const config = {
//       type: "doughnut",
//       data: newData,
//       options: {
//         plugins: {
//           legend: {
//             display: false, // This removes the legend
//           },
//           tooltips: {
//             enabled: "none",
//           },
//         },
//       },
//     };

//     // //console.log(res);

//     myc.data.datasets[0].data = [];
//     myc.data.labels = [];
//     // const { newData, totalSeats } = extractECI_Data(res);
//     // myc.data = newData;
//     // myc.data.labels.push(newData.labels);
//     // myc.data.datasets[0].data.push(...newData.datasets[0].data);
//     // myc.data.datasets[0].backgroundColor = newData.datasets[0].backgroundColor;

//     myc.data = {
//       ...newData,
//     };
//     document.getElementById("center_text").innerHTML =
//       totalSeats + "/" + totalSeats;
//     myc.update();
//     $("#not-live-note").hide();
//   }
// });
