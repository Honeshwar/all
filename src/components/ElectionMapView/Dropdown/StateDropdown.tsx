import { useCallback, useEffect, useState } from "react";
import { useFilterContextValue } from "@/context/MapViewFilterContext";
import clsx from "clsx";
import { debouncing } from "@/utils/common-function";

export default function StateDropdown() {
  const {
    select_state,
    setSelect_state,
    showStateDropDown,
    setShowStateDropDown,
    setShowConstituencyDropDown,
    setShowElectionYearDropDown,
    resetFilterToInitial,
    select_sabha,
  } = useFilterContextValue();

  const [states, setStates] = useState<string[]>([]);
  const [currStates, setCurrStates] = useState<string[]>([]);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://dhruvresearch.com/api/v2/result/state?election_type=${
            select_sabha === "Vidhan Sabha" ? "VS" : "LS"
          }`
        );
        const responseData = await response.json();
        // console.log("response state", responseData);
        setStates(responseData.data);
        setCurrStates(responseData.data);
        setSearchText("");
      } catch (error) {
        console.log("error in fetch states", error);
      }
    };

    fetchStates();
  }, [select_sabha]);

  const [india, setIndia] = useState(false);
  const handleSelectState = (name: string, isIndia?: boolean) => {
    resetFilterToInitial(3);
    setSelect_state(name);
    setShowStateDropDown(false);
    setIndia(false);
    if (isIndia) {
      setIndia(true);
    } else {
      setIndia(false);
    }
  };

  useEffect(() => {
    if (select_state !== "Select State") {
      setIndia(false);
    }
  }, [select_state]);
  //search
  //search
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dbn = useCallback(debouncing(searchAC, 350), []);
  // console.log("db", dbn("jhk"));
  function searchAC(
    searchText: string,
    states: string[],
    currStates: string[]
  ) {
    console.log("searchText", searchText, states, currStates);
    if (searchText === "" || states.length === 0) {
      setCurrStates(states); //[],full
      return;
    }
    //console.log("states", states);
    let newStates = [];

    newStates = states.filter((stateName) => {
      return stateName.toLowerCase().includes(searchText.toLowerCase());
    });

    console.log("newStates", newStates);
    setCurrStates(newStates);
  }

  console.log("state at statedropdown", select_state);
  return (
    <fieldset className="border-2 border-[#767575] rounded-md w-[250px] md:w-[200px] py-1 pb-[0px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative  ">
        State <span className="text-[red]">*</span>
      </legend>

      {showStateDropDown && showSearchInput ? (
        <div className="flex  justify-center items-center px-3">
          <input
            onClick={(e) => {
              e.stopPropagation();
            }}
            defaultValue={searchText}
            type="search"
            className="text-sm pb-0"
            style={{ outline: "none", borderBottom: "2px solid gray" }}
            placeholder="Search State"
            onInput={(e: any) => {
              setSearchText(e.target.value);
              dbn(e.target.value, states, currStates);
            }}
          />
        </div>
      ) : (
        <div
          className="w-[95%] px-2 text-gray-700 relative flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowConstituencyDropDown(false); //reconcilation and batching
            setShowElectionYearDropDown(false);
            setShowStateDropDown((prev: boolean) => !prev);

            setShowSearchInput(true);
          }}
        >
          <span id="select-box-1  " className="text-sm">
            {select_state === "Select State"
              ? india
                ? "India"
                : `Select State ${
                    select_sabha === "Vidhan Sabha" ? "" : "& UTs"
                  }`
              : select_state}
          </span>
          <span className="text-[gray] absolute right-[2px]">
            <svg
              className="w-4"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32.000000 32.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                fill="gray"
                stroke="none"
              >
                <path
                  d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
            -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
                />
              </g>
            </svg>
          </span>
        </div>
      )}

      {/* <!-- drop down --> */}
      {showStateDropDown && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute z-[1] w-[200px] h-fit bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-10 "
        >
          <ul
            id="dropdown-scroll"
            className="h-[200px] w-full overflow-y-auto text-sm"
          >
            {searchText === "" && select_sabha === "Lok Sabha" && (
              <>
                <li
                  className={clsx(
                    "py-2.5 pb-1  px-6 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg ",
                    {
                      "bg-[#ffc400] text-black":
                        select_state === "Select State" && india !== true,
                      "bg-white text-[gray]": select_state !== "Select State",
                    }
                  )}
                  onClick={() => {
                    handleSelectState("Select State");
                  }}
                >
                  Select State & UTs
                </li>
                <li
                  className={clsx(
                    "py-2.5 pb-1  px-6 hover:text-black hover:bg-[#ffc400] select-option rounded-tl-lg ",
                    {
                      "bg-[#ffc400] text-black":
                        select_state === "Select State" && india === true,
                      "bg-white text-[gray]":
                        select_state === "Select State" && india !== true,
                    }
                  )}
                  onClick={() => {
                    handleSelectState("Select State", true);
                  }}
                >
                  India
                </li>
              </>
            )}

            {currStates?.map((state, index) => (
              <li
                key={index}
                className={clsx(
                  "py-2  px-6 hover:text-black hover:bg-[#ffc400]",
                  {
                    "bg-[#ffc400] text-black": select_state === state,
                    "bg-white text-[gray]": select_state !== state,
                  }
                )}
                onClick={() => handleSelectState(state)}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
