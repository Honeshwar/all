import clsx from "clsx";
import { useEffect, useState } from "react";
import { Interface } from "readline";
import Pagination from "./Pagination";
import Filter from "./FilterTable";
import { useFilterContextValue } from "@/context/MapViewFilterContext";
import Loading from "../Loading";
interface Candidate {
  state: string;
  year: number;
  acNo?: number;
  acName?: string;
  pcNo?: number;
  pcName?: string;
  candidateName: string;
  party: string;
  votesCount: number;
  votePercentage: number;
}

export default function ConstituencyTable() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<Candidate[]>([]);

  const [totalResults, setTotalResults] = useState(0);

  const [callNextPage, setCallNextPage] = useState(false);
  const {
    select_sabha,
    select_state,
    select_constituency,
    select_election_year,
    select_compare_year,
    constituencyFilterData,
  } = useFilterContextValue();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCandidates = async (url: string) => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        setCurrentData(responseData.data.data);
        setTotalPages(Math.ceil(responseData.data.totalCount / 7));

        setTotalResults(responseData.data.totalCount);
        setCurrentPage(1);
      } catch (error) {
        console.log("error in getCandidates", error);
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
        ? `&year=${select_election_year}`
        : "";

    const url =
      process.env.NEXT_PUBLIC_API_URL +
      "/result/candidates/filter?" +
      electionTypeParam +
      stateParam +
      constituencyParam +
      yearsParams +
      `&limit=7`;
    getCandidates(url);
  }, [select_sabha, select_state, select_constituency, select_election_year]);

  useEffect(() => {
    const getDataFromPageNO = async (url: string) => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();

        setCurrentData(responseData.data.data);
        setTotalPages(Math.ceil(responseData.data.totalCount / 7));

        setTotalResults(responseData.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.log("error in getDataFromPageNO", error);
      } finally {
        setCallNextPage(false);
      }
    };

    if (callNextPage) {
      const electionTypeParam =
        select_sabha === "Vidhan Sabha"
          ? "election_type=VS"
          : "election_type=LS";
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
          ? `&years=${select_election_year}`
          : "";
      const sortParam = isSortByAsc ? "&sort=ASC" : "&sort=DESC";

      const url =
        process.env.NEXT_PUBLIC_API_URL +
        "/result/candidates/filter?" +
        electionTypeParam +
        stateParam +
        constituencyParam +
        yearsParams +
        `&limit=7&page=` +
        currentPage +
        sortParam;
      setLoading(true);
      getDataFromPageNO(url);
    }
  }, [callNextPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentData(candidates.slice((newPage - 1) * 7, newPage * 10));
    setCurrentPage(newPage);
    setCallNextPage(true);
  };

  // const sortTable = (currentData: Candidate[], value: string) => {
  //   currentData.sort((a: Candidate, b: Candidate) => {
  //     let first = "";
  //     let second = "";
  //     if (value === "candidate") {
  //       first = a.candidateName.toUpperCase();
  //       second = b.candidateName.toUpperCase();
  //     } else {
  //       first = a.party.toUpperCase();
  //       second = b.party.toUpperCase();
  //     }

  //     if (first < second) {
  //       return -1;
  //     }
  //     if (first > second) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  //   return currentData;
  // };

  const [isSortByAsc, setIsSortByAsc] = useState(false);

  return (
    <div className="w-full mx-auto max-w-[1400px] pt-4 md:pt-8 flex flex-col gap-5 relative">
      <div>
        <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-[#d8ac00] text-center">
          Powered by: ECI
        </h1>

        <div className="absolute   md:top-10 right-0  text-[1.2rem] text-[gray]">
          <span className="text-[.8rem] md:text-[1rem] text-black font-semibold">
            Candidate
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 pb-8 ">
        <h1 className="text-[.8rem] md:text-[1.5rem] font-[600]">
          {candidates.length > 0 && candidates[0].state}
        </h1>
        <div className="w-full h-[71vh]  overflow-x-auto md:h-[600px]">
          <table className="w-full">
            <thead>
              <tr className="bg-[#fcb715]">
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px] ">
                  CONSTITUENCY
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  CANDIDATE
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  PARTY
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px] relative">
                  VOTE
                  <span className="absolute top-[calc(50%+4px)] bottom-0 md:top-0  flex flex-col justify-center  mx-auto md:mx-0 left-0 md:left-auto right-0 w-fit md:right-1  lg:right-2 xl:right-5">
                    {/* decrease 3,2,1 */}

                    <svg
                      onClick={
                        isSortByAsc
                          ? () => {
                              setCallNextPage(true);
                              setIsSortByAsc(false);
                            }
                          : () => {}
                      }
                      className={clsx(
                        "w-[18px] h-[18px] md:w-6 md:h-6 fill-red-500 cursor-pointer hover:fill-red-600",
                        {
                          "fill-red-600 ": !isSortByAsc,
                          "fill-red-500 cursor-pointer": isSortByAsc,
                        }
                      )}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {/* increase 1,2,3 */}

                    <svg
                      onClick={
                        !isSortByAsc
                          ? () => {
                              setCallNextPage(true);
                              setIsSortByAsc(true);
                            }
                          : () => {}
                      }
                      className={clsx(
                        "w-[18px] h-[18px] md:w-6 md:h-6 -mt-2 md:-mt-2 fill-green-500 cursor-pointer hover:fill-green-600  ",
                        {
                          "fill-green-600 ": isSortByAsc,
                          "fill-green-500 cursor-pointer": !isSortByAsc,
                        }
                      )}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </th>
                <th className="text-[.8rem] md:text-[18px] py-6 border-2 px-2 border-[gray] border-t-[.1px]">
                  VOTE%
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="w-full    flex justify-center items-center absolute ">
                  <td className="absolute  top-16 left-0 right-0 mx-auto  ">
                    <Loading />
                  </td>
                </tr>
              ) : (
                currentData.map((candidate, index) => (
                  <tr
                    key={index}
                    className={clsx({
                      "bg-[#ebebeb]": index % 2 == 0,
                      "bg-white": index % 2 != 0,
                    })}
                  >
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {select_sabha === "Vidhan Sabha"
                        ? candidate.acName
                        : candidate.pcName}
                    </td>
                    <td className="w-[fit-content] text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.candidateName}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.party}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.votesCount}
                    </td>
                    <td className="text-[.8rem] md:text-[16px] px-2 py-2 md:px-5 md:py-6 text-center font-medium border-2 border-[gray]">
                      {candidate.votePercentage?.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
}
