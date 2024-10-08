import { useEffect, useState } from "react";
import Doughnut from "./Doughnut";
import Table from "./Table";
import { useFilterContextValue } from "@/context/MapViewFilterContext";
import Loading from "../Loading";

interface partyAndSeats {
  party: string;
  seats: number;
}
interface yearAndSeats {
  "2008": partyAndSeats[];
  "2009": partyAndSeats[];
  "2010": partyAndSeats[];
  "2011": partyAndSeats[];
  "2012": partyAndSeats[];
  "2013": partyAndSeats[];
  "2014": partyAndSeats[];
  "2015": partyAndSeats[];
  "2016": partyAndSeats[];
  "2017": partyAndSeats[];
  "2018": partyAndSeats[];
  "2019": partyAndSeats[];
  "2020": partyAndSeats[];
  "2021": partyAndSeats[];
  "2022": partyAndSeats[];
  "2023": partyAndSeats[];
}

export default function DoughnutAndTable() {
  const [electionResult, setElectionResult] = useState<any>(null);
  const [table, setTable] = useState<any>({});
  const {
    select_sabha,
    select_state,
    select_constituency,
    select_compare_year,
  } = useFilterContextValue();

  const { filterData, select_election_year } = useFilterContextValue();
  useEffect(() => {
    if (JSON.stringify(filterData) !== "{}") {
      extractData(filterData);
    }
  }, [filterData]);
  const [totalSeats, setTotalSeats] = useState<number>(0);

  const extractData = (data: any, isInitialData = false) => {
    const tableData = {
      year: [],
      seats: {},
      party: [],
      yearIndex: 0,
    } as any;

    const doughnutData = {
      seats: [],
      party: [],
      year: 2019,
      yearIndex: 0,
    } as {
      seats: number[];
      party: string[];
      year: number;
    };
    let incrementCount = 0,
      yearSelect = false,
      index = 0,
      totalYearCount = Object.keys(data).length;
    for (const year in data) {
      tableData.year.push(year); //year add in table

      if (year === select_election_year) {
        tableData.yearIndex = tableData.year.length - 1;
      }
      for (const obj of data[year]) {
        //dougghnut onluy single year data show
        if (!isInitialData && year == select_election_year) {
          doughnutData.seats.push(Number(obj.seats));
          doughnutData.party.push(obj.party);
          doughnutData.year = Number(select_election_year);
        } else if (
          !isInitialData &&
          select_election_year === "Select Election year" &&
          index === totalYearCount - 1 &&
          !yearSelect
        ) {
          //last year select
          doughnutData.seats.push(Number(obj.seats));
          doughnutData.party.push(obj.party);
          doughnutData.year = Number(year);

          tableData.yearIndex = tableData.year.length - 1;
        }

        if (tableData.seats[obj.party] === undefined) {
          tableData.seats[obj.party] = [];
        }
        if (tableData.seats[obj.party].length !== incrementCount) {
          for (let addi = 0; addi < incrementCount; addi++) {
            tableData.seats[obj.party].push(undefined);
          }
        }
        tableData.seats[obj.party].push(Number(obj.seats));
        if (tableData.party.includes(obj.party) === false) {
          tableData.party.push(obj.party);
        }
      }
      incrementCount++;
      index++;
    }

    const sortedParties = sortPartiesBySeats(
      tableData.party,
      tableData.seats,
      // tableData.yearIndex,
      0,
      false
    );
    tableData.party = sortedParties;
    setTable(tableData);

    //calculate total seats
    let ts = 0;
    for (let a = 0; a < doughnutData.party.length; a++) {
      ts += doughnutData.seats[a];
    }
    setTotalSeats(ts);

    if (doughnutData.party.length > 3) {
      // sort doughnut data to filter it
      console.log("doughnutData", doughnutData);
      const indices = doughnutData.seats.map((value, index) => index);

      indices.sort((i, j) => doughnutData.seats[j] - doughnutData.seats[i]);

      const sortedParty = indices.map((index) => doughnutData.party[index]);
      const sortSeats = indices.map((index) => doughnutData.seats[index]);

      let totalTOp3Seats = 0;
      for (let i = 0; i < 3; i++) {
        totalTOp3Seats += sortSeats[i];
      }
      const doughnutDataSorted = {
        ...doughnutData,
        seats: [...sortSeats.slice(0, 3), ts - totalTOp3Seats],
        party: [...sortedParty.slice(0, 3), "OTHERS"],
      };
      setElectionResult(doughnutDataSorted);

      console.log("doughnut data sorted", doughnutDataSorted);
    } else {
      setElectionResult(doughnutData);
    }
  };
  function sortPartiesBySeats(
    parties: string[],
    seats: { [key: string]: number[] },
    yearIndex: number,
    isAscendingSort?: boolean
  ) {
    console.log(seats);
    // Helper function to get the first seat value or handle undefined cases
    function getFirstSeatValue(party: string) {
      if (seats[party] && Array.isArray(seats[party])) {
        if (seats[party][yearIndex] !== undefined)
          return seats[party][yearIndex];
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
      return isAscendingSort ? seatA - seatB : seatB - seatA;
    });
  }

  useEffect(() => {
    const getDoughnutAndTableData = async (url: string) => {
      // setLoading(true);
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        extractData(responseData.data, false);
        // setLoading(false);
      } catch (error) {
        console.log("error in doughnut and table", error);
      }
    };

    const electionTypeParam =
      select_sabha === "Vidhan Sabha" ? "election_type=VS" : "election_type=LS";
    const stateParam =
      select_state !== "Select State"
        ? `&state=${encodeURIComponent(select_state)}`
        : "";
    const constituencyParam =
      select_sabha === "Vidhan Sabha"
        ? select_constituency.acNo !== -1
          ? `&constituency=${select_constituency.acNo}`
          : ""
        : select_constituency.pcNo !== -1
        ? `&constituency=${select_constituency.pcNo}`
        : "";
    const yearsParams =
      select_election_year !== "Select Election year"
        ? `&years=${JSON.stringify([
            select_election_year,
            ...select_compare_year,
          ])}`
        : "";

    let url = "";
    if (stateParam === "" && select_election_year === "")
      url =
        process.env.NEXT_PUBLIC_API_URL +
        "/result/election-result?" +
        electionTypeParam +
        stateParam +
        constituencyParam +
        yearsParams;
    else
      url =
        process.env.NEXT_PUBLIC_API_URL +
        "/result/election-result/filter?" +
        electionTypeParam +
        stateParam +
        constituencyParam +
        yearsParams;
    getDoughnutAndTableData(url);
  }, [
    select_sabha,
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
  ]);

  return (
    <div className="w-full md:w-1/2 min-h-[80vh] flex justify-center flex-col gap-10 pt-5 md:pt-7 pb-10 px-0 md:px-10 relative">
      {true ? (
        <>
          <Doughnut electionResult={electionResult} totalSeats={totalSeats} />
          <Table data={table} sortPartiesBySeats={sortPartiesBySeats} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
