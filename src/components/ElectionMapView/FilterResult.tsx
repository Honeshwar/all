import dynamic from "next/dynamic";

import ConstituencyTable from "./Results/ConstituencyTable";
import DoughnutAndTable from "./Results/DoughnutAndTable";
const LazyConstituencyTable = dynamic(
  () => import("./Results/ConstituencyTable"),
  {
    ssr: false,
  }
);

const LazyMap = dynamic(() => import("./Results/Map"), {
  ssr: false,
});

export default function FilterResult() {
  return (
    <section>
      {/* doughnut, table and map  */}
      <div
        className="w-full bg-[#f2cbd1] border-t-2 border-b-2 border-yellow-400 flex justify-start md:justify-between flex-wrap "
        style={{
          background:
            "linear-gradient(180deg, #FFF7DF 0%, #FFFDF2 58.74%, #FFF6DA 113.54%)",
        }}
      >
        <DoughnutAndTable />

        {/* <Map />  343kb lazy one 162kb */}
        <LazyMap />
      </div>

      {/* result bar chart and Table */}
      <div className="w-full pt-4 md:pt-8 px-5 md:px-20 flex flex-col gap-8 md:gap-8">
        {/* <ConstituencyTable /> */}
        <LazyConstituencyTable />
      </div>
    </section>
  );
}
