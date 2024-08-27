"use client";
import { useCallback, useEffect, useState } from "react";
import { useFilterContextValue } from "@/context/FilterContext";
import clsx from "clsx";
import { debouncing } from "@/utils/common-function";
export default function StateDropdown() {
  const [states, setStates] = useState([]);
  const [currStates, setCurrStates] = useState([]);

  const {
    selected_state,
    setSelected_state,
    showStateDropDown,
    showPartyDropDown,

    setShowStateDropDown,
    setShowElectionYearDropDown,
    setShowPCDropDown,
    setShowPartyDropDown,
  } = useFilterContextValue();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/analysis/state`
        );
        const responseData = await response.json();
        // console.log("response state", responseData);
        setStates(responseData.data);
        setCurrStates(responseData.data);
      } catch (error) {
        console.log("error in fetch states", error);
      }
    };

    fetchStates();
  }, []);

  const handleSelectState = (name) => {
    setSelected_state(name);
    setShowStateDropDown(false);
  };

  //search
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dbn = useCallback(debouncing(searchAC, 350), []);
  // console.log("db", dbn("jhk"));
  function searchAC(searchText, states, currStates) {
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

  useEffect(() => {
    if (window) {
      // console.log("dshretygre");
      window.onclick = function (event) {
        // console.log("state");
        setShowPartyDropDown(false);
        setShowStateDropDown(false);

        setShowSearchInput(false);
      };
    }
  }, []);

  return (
    <fieldset className="cursor-pointer border-[1.2px] border-[lightgray] rounded-md w-[250px]  py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative  ">
        State <span className="text-[red]">*</span>
      </legend>

      {showStateDropDown && showSearchInput ? (
        <div className="flex justify-start items-center pl-4">
          <input
            onClick={(e) => {
              e.stopPropagation();
            }}
            defaultValue={searchText}
            type="search"
            className="text-sm pb-1"
            style={{ outline: "none", borderBottom: "2px solid gray" }}
            placeholder="Search State"
            onInput={(e) => {
              setSearchText(e.target.value);
              dbn(e.target.value, states, currStates);
            }}
          />
        </div>
      ) : (
        <div
          className="w-[95%] px-2 text-gray-700 relative flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            //reconcilation and batching

            setShowStateDropDown((prev) => !prev);

            //hide all other dropdowns
            setShowElectionYearDropDown(false);
            setShowPCDropDown(false);
            setShowPartyDropDown(false);
            setShowSearchInput(true);
          }}
        >
          <span
            id="select-box-1  "
            className="text-sm text-black font-semibold"
          >
            {selected_state}
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
        <div className="absolute z-[1] w-[200px] h-fit bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-9 ">
          <ul
            id="dropdown-scroll"
            className="h-[200px] w-full overflow-y-auto text-sm flex flex-col gap-1"
          >
            {currStates?.map((state, index) => (
              <li
                key={index}
                className={clsx(
                  "py-2  px-6 hover:text-white hover:bg-[#ffc400] text-black font-semibold rounded-sm",
                  {
                    "bg-[#ffc400] ": selected_state === state,
                    "bg-white  ": selected_state !== state,
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectState(state);
                }}
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
