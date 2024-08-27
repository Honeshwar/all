"use client";
import { createContext, useContext, useEffect, useState } from "react";
//create context
const context = createContext({} as any);

//provide context
function MapViewFilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [select_sabha, setSelect_sabha] = useState("Lok Sabha"); //or Lok Sabha/Vidhan Sabha
  const [select_state, setSelect_state] = useState("Select State");
  const [select_constituency, setSelect_constituency] = useState(
    select_sabha === "Vidhan Sabha"
      ? {
          acNo: -1,
          acName: "Select AC",
        }
      : {
          pcNo: -1,
          pcName: "Select PC",
        }
  );
  const [select_election_year, setSelect_election_year] = useState(
    "Select Election year"
  );
  const [select_compare_year, setSelect_compare_year] = useState([]); //"2018"
  const [filterData, setFilterData] = useState({});

  // dropdowns
  const [showStateDropDown, setShowStateDropDown] = useState(false);
  const [showConstituencyDropDown, setShowConstituencyDropDown] =
    useState(false);
  const [showElectionYearDropDown, setShowElectionYearDropDown] =
    useState(false);

  // map
  const [stateGeojson, setStateGeojson] = useState([]);
  const [assemblyConstituenciesGeojson, setAssemblyConstituenciesGeojson] =
    useState([]);
  const [
    parliamentaryConstituenciesGeojson,
    setParliamentaryConstituenciesGeojson,
  ] = useState([]);

  const [constituencyFilterData, setConstituencyFilterData] = useState({});

  const resetFilterToInitial = (number: number) => {
    switch (number) {
      case 1:
        setSelect_compare_year([]);
        break;
      case 2:
        setSelect_election_year("Select Election year");
        setSelect_compare_year([]);
        break;
      case 3:
        setSelect_constituency(
          select_sabha === "Vidhan Sabha"
            ? {
                acNo: -1,
                acName: "Select AC",
              }
            : {
                pcNo: -1,
                pcName: "Select PC",
              }
        );
        setSelect_election_year("Select Election year");
        setSelect_compare_year([]);
        break;
      case 4:
        setSelect_state("Select State");
        setSelect_constituency(
          select_sabha === "Vidhan Sabha"
            ? {
                acNo: -1,
                acName: "Select AC",
              }
            : {
                pcNo: -1,
                pcName: "Select PC",
              }
        );
        setSelect_election_year("Select Election year");
        setSelect_compare_year([]);
        setShowConstituencyDropDown(false);
        setShowElectionYearDropDown(false);
        setShowStateDropDown(false);
        break;
      default:
      //console.log("reset filter error");
    }
  };
  useEffect(() => {
    if (window) {
      window.onclick = () => {
        setShowStateDropDown(false);
        setShowConstituencyDropDown(false);
        setShowElectionYearDropDown(false);
      };
    }
  }, []);
  useEffect(() => {
    Promise.all([
      fetch(`data/geojson/states.geojson`),
      fetch(`data/geojson/assembly.geojson`),
      fetch(`data/geojson/parliament.geojson`),
      // fetch(
      //   `https://dhruvresearch.com/api/v2/result/map?election_type=${
      //     select_sabha === "Vidhan Sabha" ? "VS" : "LS"
      //   }`
      // ),
    ])
      .then(async ([res1, res2, res3]) => {
        const a = await res1.json();
        const b = await res2.json();
        const c = await res3.json();

        setStateGeojson(a);
        setAssemblyConstituenciesGeojson(b);
        setParliamentaryConstituenciesGeojson(c);
      })
      .catch((error) => {
        console.log("error while fetching geojson files", error);
      });
  }, []);

  return (
    <context.Provider
      value={{
        select_sabha,
        setSelect_sabha,
        select_state,
        setSelect_state,
        select_constituency,
        setSelect_constituency,
        select_election_year,
        setSelect_election_year,
        select_compare_year,
        setSelect_compare_year,

        showStateDropDown,
        setShowStateDropDown,
        showConstituencyDropDown,
        setShowConstituencyDropDown,
        showElectionYearDropDown,
        setShowElectionYearDropDown,

        filterData,
        setFilterData,

        resetFilterToInitial,

        constituencyFilterData,
        setConstituencyFilterData,

        stateGeojson,
        assemblyConstituenciesGeojson,
        parliamentaryConstituenciesGeojson,
      }}
    >
      {children}
    </context.Provider>
  );
}

//consumer
function useFilterContextValue() {
  return useContext(context);
}

export { MapViewFilterContextProvider, useFilterContextValue };
