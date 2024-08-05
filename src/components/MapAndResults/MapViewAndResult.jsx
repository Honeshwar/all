"use client";
import Map from "./Map";
import Result from "./Result";

export default function MapViewAndResult() {
  return (
    <div
      className="w-full border flex flex-wrap sm:flex-nowrap justify-center md:justify-between  px-0 sm:pl-5 pr-0 py-4 rounded-lg gap-10  "
      style={{ boxShadow: "0px 0px 10px .5px lightgray" }}
    >
      <Map />
      <div className="custom-scrollbar flex sm:hidden lg:flex  max-w-fit   overflow-y-auto min-w-[100%] sm:min-w-[350px] pr-0 sm:pr-7 justify-center sm:justify-end">
        <Result />
      </div>
    </div>
  );
}
